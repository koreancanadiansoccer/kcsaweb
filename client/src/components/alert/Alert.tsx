import React, { FC } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export const Alert: FC<AlertProps> = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
