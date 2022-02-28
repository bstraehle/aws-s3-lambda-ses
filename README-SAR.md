# Serverless nanoservice using S3, Lambda, and SES  

Start up:  

- Deploy application, specifying sender and receiver email address (sender must be a SES verified identity)  

Test:  

- Go to S3, bucket, and upload file  
- Go to email client and view email  

Tear down:  

- Go to CloudFormation and delete application stack  
- Go to CloudWatch, log groups, log group and delete  
