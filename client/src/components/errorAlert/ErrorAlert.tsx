import React, { FunctionComponent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import { Alert } from '../../components/alert/Alert';

interface ErrorAlertProps {
  error?: string;
  resetError: () => void;
}

export const ErrorAlert: FunctionComponent<ErrorAlertProps> = ({
  error,
  resetError,
}) => {
  return (
    <Snackbar
      open={!!error}
      autoHideDuration={8000}
      onClose={() => {
        resetError();
      }}
    >
      <Alert
        onClose={() => {
          resetError();
        }}
        severity="error"
      >
        {error}
      </Alert>
    </Snackbar>
  );
};
