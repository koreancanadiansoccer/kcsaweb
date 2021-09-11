import { SES } from "aws-sdk";
import { SendEmailRequest } from "aws-sdk/clients/ses";

export const sendEmail = (email: string) => {
  try {
    const REGION = "us-east-1";

    const charset = "UTF-8";

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

    const ses = new SES({ region: REGION });

    const params: SendEmailRequest = {
      Source: "koreancanadiansoccer@gmail.com",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: "Welcome to KCSA",
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
    ses.sendEmail(params).promise();
  } catch (error) {
    console.error(error);
  }
};
