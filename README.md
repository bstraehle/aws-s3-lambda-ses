# Serverless nanoservice using S3, Lambda, and SES

Available in the [AWS Serverless Application Repository](https://serverlessrepo.aws.amazon.com/applications/us-west-2/819097794827/nanoservice-s3-lambda-ses).

## Architecture

![Architecture](architecture.png)

```mermaid
flowchart LR
    user([Uploader]) -- PutObject --> s3[S3 bucket]
    subgraph stack [AWS SAM application]
        s3 -- s3:ObjectCreated:* --> fn[Lambda function<br/>nodejs24.x arm64]
        fn -- SendEmail --> ses[Amazon SES]
        role[IAM execution role] -. assumes .-> fn
        fn -. logs .-> logs[CloudWatch Logs]
    end
```

## Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

Clone repo:
```
git clone https://github.com/bstraehle/aws-s3-lambda-ses.git
cd aws-s3-lambda-ses
```

Validate template:
```
sam validate --lint
```

## Deploy directly

```
sam deploy --guided --capabilities CAPABILITY_IAM --parameter-overrides EmailFrom=<sender> EmailTo=<receiver>
```

## Publish to the AWS Serverless Application Repository

Create S3 bucket:
```
aws s3 mb s3://<bucket>
```

Update policy.json and add account and bucket info

Allow the Serverless Application Repository to read from bucket:
```
aws s3api put-bucket-policy --bucket <bucket> --policy file://policy.json
```

Package application:
```
sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket <bucket>
```

Publish application (bump `SemanticVersion` in template.yaml for each new version):
```
sam publish --template packaged.yaml --region <region>
```

Login to the AWS Console and deploy application

## Test

- Go to S3, bucket (see `BucketName` stack output), and upload file
- Go to email client and view email

Or with the AWS CLI:

```
aws s3 cp <file> s3://<bucket>/
```

## Tear down

- Go to S3, bucket, and empty bucket
- Go to CloudFormation and delete application stack (this also deletes the CloudWatch log group)
- Go to S3 and empty and delete the packaging bucket, if no longer needed
