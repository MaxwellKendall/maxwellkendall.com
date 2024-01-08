Update Resume:

```shell
aws s3 cp <localPath> s3://maxwell-kendall-resume/MAXWELL_KENDALL_Resume.PDF
aws s3api put-object-acl --bucket maxwell-kendall-resume --key MAXWELL_KENDALL_Resume.PDF --acl public-read
```