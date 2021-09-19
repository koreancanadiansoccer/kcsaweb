import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Input } from '../input/Input';

interface LoginProps {
  className?: string;
}

/**
 * TODO:
 * - input data 와 passport middleware 연결
 * Form to handle log in
 */
const UnstyledLoginForm: FunctionComponent<LoginProps> = ({ className }) => {
  return (
    <Box className={className} mt={20}>
      <Box>
        <Typography className="login-title" variant="h4" align="center">
          Login
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Paper className="login-form">
          <Input className="login-field" type="email" label="Email:" fullWidth margin="normal" />
          <Input className="login-field" type="password" label="Password:" fullWidth margin="normal" />
          <Box textAlign="center" mt={3}>
            <Button size="large" variant="contained" color="primary">
              LOGIN
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export const LoginForm = withTheme(styled(UnstyledLoginForm)`
  .login-title {
    font-size: 2em;
    font-weight: bold;
  }
  .login-form {
    padding: 20px;
    border: 2px solid rgba(142, 142, 147, 0.2);
  }
  .login-field {
    width: 500px;
  }
`);