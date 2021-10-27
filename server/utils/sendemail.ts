import { SES } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import * as dotenv from 'dotenv';

dotenv.config();

export const sendEmail = (email: string) => {
  try {
    const charset = 'UTF-8';

    const html = `<html>
      <head>
      <title>Page Title</title>
      <style>
      </style>
      </head>
      <body>
      <div style=font-family: Arial, Helvetica, sans-serif;">
      <img src="kcsa_logo.png" alt="KCSA Logo" style="width:200px">
      <h1>Welcome to KCSA!</h1>
      <p>You have created an account with us at KCSA. To verify your email, please click the link below.</p>
      <a href="http://kcsacanada.ca/">http://kcsacanada.ca/</a>
      
      </div>
      </body>
      </html>`;

    const email_data: SendEmailRequest = {
      Source: 'koreancanadiansoccer@gmail.com',
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: 'Welcome to KCSA',
          Charset: charset,
        },
        Body: {
          Html: {
            Data: html,
            Charset: charset,
          },
        },
      },
    };

    // orginal region was 'us-east-1'. Switch to 'us-east-2'.
    const ses = new SES({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.REGION,
    });

    ses.sendEmail(email_data).promise();
  } catch (error) {
    console.error(error);
  }
};
