'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES({ region: "us-west-2" });
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = process.env.EMAIL_TO;

exports.handler = (event) => {
    var s3Event = event.Records[0];

    console.log('S3 Event:', s3Event);

    var params = {
        Destination: {
          ToAddresses: [EMAIL_TO],
        },
        Message: {
          Body: {
            Text: { Data: JSON.stringify(s3Event) },
          },
          Subject: { Data: s3Event.s3.object.key },
        },
        Source: EMAIL_FROM,
      };

      return SES.sendEmail(params).promise();
};