import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const SES = new SESClient();
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = process.env.EMAIL_TO;

export const handler = async (event) => {
    for (const s3Event of event.Records) {
        const key = decodeURIComponent(s3Event.s3.object.key.replace(/\+/g, ' '));

        console.log('S3 Event:', JSON.stringify(s3Event));

        await SES.send(new SendEmailCommand({
            Destination: {
                ToAddresses: [EMAIL_TO]
            },
            Message: {
                Body: {
                    Text: { Data: JSON.stringify(s3Event, null, 2) }
                },
                Subject: { Data: key }
            },
            Source: EMAIL_FROM
        }));
    }
};
