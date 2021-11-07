import { SES } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import * as dotenv from 'dotenv';

dotenv.config();

const URL =
  process.env.NODE_ENV === 'production'
    ? 'http://kcsacanada.ca'
    : 'http://localhost:3000';

export const sendEmail = async (
  name: string,
  email: string,
  teamName: string,
  base64UID: string
): Promise<void> => {
  try {
    const charset = 'UTF-8';
    const signupURL = `${URL}/create?token=${base64UID}`;
    const html = `<html>
      <head>
      <title>Page Title</title>
      <style>
        body {
          color: red;
        }
      </style>
      </head>
      <body>
      <div style=font-family: Arial, Helvetica, sans-serif;">
      
      <h1 style="color:#274555;">Welcome to KCSA ${name}!</h1>
      <h3 style="color:#274555;">You are invited to join the KCSA as the club official of ${teamName}.</h3>
      <h3 style="color:#274555;">Please click the link below to complete the registration of your club.</h3>
      <a href="${signupURL}">${signupURL}</a>
      
      <div style="margin-top:16px;">
        <img src="https://kcsa-logo.s3.amazonaws.com/kcsa-contact.png" alt="KCSA Logo" title="Logo" style="display:block" width="275" height="81">
      </div>
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
          Data: 'KCSA Captain Invitation',
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
