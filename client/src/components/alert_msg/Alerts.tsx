import React, { FunctionComponent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import { Alert } from '../alert/Alert';

interface AlertProps {
  msg?: string;
  resetMsg: () => void;
}

export const ErrorAlert: FunctionComponent<AlertProps> = ({
  msg,
  resetMsg,
}) => {
  return (
    <Snackbar
      open={!!msg}
      autoHideDuration={8000}
      onClose={() => {
        resetMsg();
      }}
    >
      <Alert
        onClose={() => {
          resetMsg();
        }}
        severity="error"
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

export const SuccessAlert: FunctionComponent<AlertProps> = ({
  msg,
  resetMsg,
}) => {
  return (
    <Snackbar
      open={!!msg}
      autoHideDuration={8000}
      onClose={() => {
        resetMsg();
      }}
    >
      <Alert
        onClose={() => {
          resetMsg();
        }}
        severity="success"
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};
