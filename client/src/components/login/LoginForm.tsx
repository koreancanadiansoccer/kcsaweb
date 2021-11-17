import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { LoginInput } from '../../types/login';
import { EMAIL_REGEX } from '../../types/user';

interface LoginProps {
  className?: string;
  onAdd: (user: LoginInput) => Promise<void>;
  error?: string;
}

/**
 * Form to handle log in
 */
const UnstyledLoginForm: FunctionComponent<LoginProps> = ({
  className,
  onAdd,
  error,
}) => {
  const [newLogin, setNewLogin] = useState<LoginInput>({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');

  const isValid = useMemo(
    () => !!newLogin?.email && !emailError && !!newLogin?.password,
    [newLogin]
  );

  useEffect(
    () =>
      setNewLogin({
        email: '',
        password: '',
      }),
    []
  );

  return (
    <Box className={className} mt={10}>
      <Box>
        <Typography className="login-title" variant="h4" align="center">
          Login
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Paper className="login-form">
          <form>
            <Input
              className="login-field"
              type="email"
              label="Email:"
              value={newLogin.email}
              error={!!emailError}
              helperText={emailError}
              fullWidth
              margin="normal"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                const email = evt.target.value;

                setEmailError(
                  !EMAIL_REGEX.test(email) ? 'Please enter valid email' : ''
                );

                setNewLogin({
                  ...newLogin,
                  email: email.trim(),
                });
              }}
            />

            <Input
              className="login-field"
              type="password"
              label="Password:"
              value={newLogin.password}
              fullWidth
              margin="normal"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setNewLogin({
                  ...newLogin,
                  password: evt.target.value,
                });
              }}
            />
            {error && (
              <Box textAlign="center" fontWeight={700}>
                <Typography color="error">{error}</Typography>
              </Box>
            )}

            <Box textAlign="center" mt={3}>
              <Button
                type="submit"
                disabled={!isValid}
                size="large"
                variant="contained"
                color="primary"
                onClick={(evt) => {
                  evt.preventDefault();
                  void onAdd(newLogin);
                }}
              >
                LOGIN
              </Button>
            </Box>
          </form>
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
    min-width: 300px;
    width: 100%;
  }
`);
