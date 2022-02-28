'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES({ region: "us-west-2" });
const EMAIL_ADDRESS_SENDER = process.env.EMAIL_ADDRESS_SENDER;
const EMAIL_ADDRESS_RECEIVER = process.env.EMAIL_ADDRESS_RECEIVER;

exports.handler = (event) => {
    var s3Event = event.Records[0];

    console.log('S3 Event:', s3Event);

    var params = {
        Destination: {
          ToAddresses: [EMAIL_ADDRESS_RECEIVER],
        },
        Message: {
          Body: {
            Text: { Data: JSON.stringify(s3Event) },
          },
          Subject: { Data: "S3 Event" },
        },
        Source: EMAIL_ADDRESS_SENDER,
      };

      return SES.sendEmail(params).promise();
};