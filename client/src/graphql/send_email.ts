import { gql } from '@apollo/client';

export interface SendEmailInput {
  emails: string[];
}

export interface SendEmailResult {
  sendEmail: boolean;
}

// Swap out to common fragment
export const SEND_EMAIL = gql`
  mutation SendEmail($emails: [String]!) {
    sendEmail(emails: $emails)
  }
`;
