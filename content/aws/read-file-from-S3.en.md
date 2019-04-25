---
title: "Read File From S3"
date: 2019-04-25T10:53:17+02:00
---

If you need to read a file stored in AWS S3 but you don't actually need the file, or you just have to verify some value, you can run a command like this one:

```
aws s3 cp s3://bucket-terraform-state/my-stack/my-environment/terraform.tfstate - | grep terraform_version
```

That command just shows which version of terraform is written in the file `terraform.tfstate`.

Using the dash `-` makes the content of the file to be shown in the console (standard out)