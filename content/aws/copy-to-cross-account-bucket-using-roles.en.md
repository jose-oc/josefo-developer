---
title: "Copy to Cross Account Bucket Using Roles"
date: 2018-04-27T13:20:52+02:00
draft: false
---

In Piksel, the company I work for, we have a few services that carry out some work which generates some files, these files can be copied to a S3 bucket we provide to our customers but in some cases the customer wants to use their own S3 bucket so we needed a mechanism to copy these files to a bucket which wasn't owned by us and we didn't have permission to store files there.

Having those requirements we needed to implement a way to allow our code, which runs on EC2 instances, to copy the files on a bucket where we didn't have permissions. 
Basically, this is to allow our AWS account to copy files to a bucket owned by another AWS account.

## How to solve the problem...

There might be different ways to solve this case. 

### Policy bucket

One option is to attach a policy to the bucket as it is described in [Copy to Cross Account Bucket Using a Bucket Policy]({{< ref "copy-to-cross-account-bucket-using-bucketPolicy.en.md" >}}) 

However, this has some cons: 

- The files (objects as AWS calls them) are owned by the account that uploads them, Piksel account in this case, instead of the customer's account. This can be changed programmatically but then we'd need to change our code and these permissions set up.
- The customer wouldn't have permissions over the files unless we gave them programmatically.
- Our EC2s instances are quite restricted in permissions so we'd need to modify our configuration in AWS to give these boxes much more freedom or specify permissions per customer's bucket, which is quite detrimental.


### Assume role

That's why we looked for another solution, and this is quite elegant. This is to assume a role that the customer creates for us so that we can copy the files to their bucket as if we were they. Brilliant.

To achieve this the only extra permission we'd need to give to our EC2 instances is _sts:AssumeRole_ to allow them assume some other role.

{{% panel theme="info" header="" %}}
Assume other's account role is a much more smart way of achieve out goal.
{{% /panel %}}

#### Customer's configuration

The customer has to create the role that we'll assume. This role is just a way of saying to another AWS account: now you're going to be this other account but you'd only have permissions to do these things. 

As a previous step, we'll create a policy with a set of permissions to write into the specific bucket. 

##### Policy

{{< figure src="/aws-s3/assuming-role/aws-s3-crossAccount-assumingRole-Piksel-creatingPolicy-01.png" caption="" >}}

But you can also write the json that describes the policy instead of working with the form:


```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:AbortMultipartUpload",
                "s3:ListBucket",
                "s3:GetBucketLocation"
            ],
            "Resource": [
                "arn:aws:s3:::a-customer-bucket",
                "arn:aws:s3:::a-customer-bucket/*"
            ]
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "s3:HeadBucket",
                "s3:ListObjects"
            ],
            "Resource": "*"
        }
    ]
}
```

And finish the creation of the policy giving it a name:

{{< figure src="/aws-s3/assuming-role/aws-s3-crossAccount-assumingRole-Piksel-creatingPolicy-02.png" caption="" >}}


Now that we have **the policy in place**, let's continue creating the role.


##### Role

So, the first thing the customer has to do is to create the new role choosing the type _Another AWS account_ so that a third party can assume this role, in this case Piksel's AWS account:

{{< figure src="/aws-s3/assuming-role/aws-s3-crossAccount-assumingRole-configuration01.png" caption="" >}}

You have to provide the account ID that will assume this role.

Optionally, you can set an _external ID_ which is something like a password to be provided the the third party account. I personally think this is a good idea as later on would be easier for the customer to change this value when you don't want this role to be assumed temporary. 


The next step is to give permissions to this role by attaching a policy. You can attach a built-in policy such as _AmazonS3FullAccess_ but this looks too wide so it's better to have a custom policy to give permissions only to a specific bucket.

In case you missied the previous step, you can click on the _Create policy_ button and a new window will pop up with the policy creation wizard, follow the steps to select the permissions to work with the bucket.

Select the policy you've just created, if you've just created the new policy you may need to refresh the list of policies:

{{< figure src="/aws-s3/assuming-role/aws-s3-crossAccount-assumingRole-configuration02.png" caption="" >}}


The last step is just to give the role a name.

{{< figure src="/aws-s3/assuming-role/aws-s3-crossAccount-assumingRole-configuration03.png" caption="" >}}



Now, when the customer wanted to change the _external ID_ they just have to go to the role summary and select the tab _trust relationships_ and edit it, they'll see a json like this one:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::012345678900:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "my-s4cr4t"
        }
      }
    }
  ]
}
```

where changing the externalID value they'll prevent the Piksel account to access until they send the new secret.





#### Assume role in Java


{{< figure src="/aws-s3/assuming-role/cross-account-role-diagram.png" caption="" >}}


Now that we have the AWS accounts configured, let's use this behaviour in Java.

```java
private static final String CUSTOMER_BUCKET = "a-customer-bucket";
private static final String ROLE_ARN = "arn:aws:iam::987654321099:role/PikselAssumeRole";

    private static void usingStsCrossAccount() {

        // Step 1. AWS Security Token Service (STS) AssumeRole API, specifying
        // the ARN for the role created by the customer.

        AWSSecurityTokenServiceClient stsClient = new AWSSecurityTokenServiceClient();

        AssumeRoleRequest assumeRequest = new AssumeRoleRequest()
            .withRoleArn(ROLE_ARN)
            .withDurationSeconds(3600)
            .withRoleSessionName("demo");

        AssumeRoleResult assumeResult = stsClient.assumeRole(assumeRequest);


        // Step 2. AssumeRole returns temporary security credentials for the IAM role.

        BasicSessionCredentials temporaryCredentials =
            new BasicSessionCredentials(
                assumeResult.getCredentials().getAccessKeyId(),
                assumeResult.getCredentials().getSecretAccessKey(),
                assumeResult.getCredentials().getSessionToken());

        // Step 3. Read S3 data

        final AmazonS3Client s3 = new AmazonS3Client(temporaryCredentials);
        listObjectsOfBucket(s3, CUSTOMER_BUCKET);
    }

    private static void listObjectsOfBucket(AmazonS3 s3, String bucket) {
        System.out.println("List objects of bucket " + bucket);
        try {
            ListObjectsV2Result result = s3.listObjectsV2(bucket);
            List<S3ObjectSummary> objects = result.getObjectSummaries();
            objects.stream()
                   .limit(15)
                   .map(S3ObjectSummary::getKey)
                   .forEach(System.out::println);
        } catch (SdkClientException e) {
            System.err.println("Can't list objects of bucket " + bucket + " due to: " + e.getMessage());
        }
    }
```