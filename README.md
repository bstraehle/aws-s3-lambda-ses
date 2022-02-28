Clone repo:  
```
git clone https://github.com/bstraehle/aws-s3-lambda-ses.git
cd aws-s3-lambda-ses
```

Create S3 bucket:  
```
aws s3 mb s3://<bucket>
```

Update policy.json and add account and bucket info  

Allow read from bucket:  
```
aws s3api put-bucket-policy --bucket <bucket> --policy file://policy.json
```

Package application:  
```
sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket <bucket>
```

Publish application:  
```
sam publish --template packaged.yaml --region <region>
```

Login to the AWS Console and deploy application  

Tear down:  

- Go to CloudFormation and delete application stack  
- Go to CloudWatch, log groups, log group and delete  
- Go to S3 and empty and delete bucket  
