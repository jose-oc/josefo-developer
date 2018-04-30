---
title: "Copy to Cross Account Bucket Using a Bucket Policy"
date: 2018-04-27T13:20:52+02:00
draft: false
---

I've had to copy files to a S3 bucket owned by another AWS account. There's a simple way of allowing the AWS account A to copy files to the AWS account B: just allowing the account A to do so using a policy.


## Policy bucket

On the policy for the bucket of the account B you can specify that the account A has permissions to put objects. 

The policy the customer would need to apply looks like this one:

```json
{
    "Id": "Policy1523869445848",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1523869437746",
            "Action": "s3:*",
            "Effect": "Allow",
            "Resource": "arn:aws:s3:::a-customer-bucket",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::012345678900:root"
                ]
            }
        },
        {
            "Sid": "Stmt1523869444506",
            "Action": "s3:*",
            "Effect": "Allow",
            "Resource": "arn:aws:s3:::a-customer-bucket/*",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::012345678900:root"
                ]
            }
        }
    ]
}
```

Although the actions allowed should be restricted, in this case I set `s3:*` just to test it.

However, this has some cons: 

- The files (objects as AWS calls them) are owned by the account that uploads them, account A in this case, instead of the account B. This can be changed, but it's not automatic, you'd need to call the API.
- The account B wouldn't have permissions over the files unless we gave them programmatically - this doesn't mean account B couldn't delete them.

