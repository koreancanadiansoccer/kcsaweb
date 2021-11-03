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
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { UserInput, User } from '../../types/user';
import { formatPhone, unformatPhone } from '../../utils/format';

interface CreateProps {
  className?: string;
  origUser?: User;
  onAdd: (user: UserInput) => Promise<void>;
}

/**
 *
 * Form to handle user addition
 */
const UnstyledCreate: FunctionComponent<CreateProps> = ({
  className,
  origUser,
  onAdd,
}) => {
  const [newUser, setNewUser] = useState<UserInput>({
    name: origUser?.name || '',
    email: origUser?.email || '',
    phoneNumber: origUser?.phoneNumber || '',
    password: '',
    passwordConfirm: '',
  });

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordConfrimError = useMemo(() => {
    return newUser.password !== newUser.passwordConfirm
      ? 'Passwords not matching'
      : '';
  }, [newUser]);
  // const [passwordConfrimError, setPasswordConfirmError] = useState('');

  const isValid = useMemo(
    () =>
      !!newUser?.name &&
      !!newUser?.email &&
      !emailError &&
      !!newUser?.phoneNumber &&
      !phoneError &&
      !!newUser?.password &&
      !!newUser?.passwordConfirm &&
      newUser.password === newUser.passwordConfirm &&
      !passwordError,
    [newUser]
  );

  useEffect(() => {
    if (origUser)
      setNewUser({
        name: origUser?.name || '',
        email: origUser?.email || '',
        phoneNumber: origUser?.phoneNumber || '',
        password: '',
        passwordConfirm: '',
      });
  }, [origUser]);
  return (
    <Box className={className} my={20}>
      <Box>
        <Typography variant="h4" align="center">
          Welcome to KCSA{origUser?.name ? `, ${origUser?.name}` : ''}
        </Typography>
        <Box mt={3}>
          <Typography variant="h5" align="center">
            Please confirm following information and create password.
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Paper className="create-form">
          <Input
            className="create-field"
            type="text"
            label="Name:"
            value={newUser.name}
            fullWidth
            margin="normal"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewUser({
                ...newUser,
                name: evt.target.value,
              });
            }}
          />

          <Input
            className="create-field"
            type="email"
            label="Email:"
            value={newUser.email}
            fullWidth
            error={!!emailError}
            helperText={emailError}
            margin="normal"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const email = evt.target.value;

              setEmailError(
                !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
                  ? 'Please enter valid email'
                  : ''
              );

              setNewUser({
                ...newUser,
                email: email.trim(),
              });
            }}
          />

          <Input
            className="create-field"
            type="text"
            label="Phone Number:"
            value={formatPhone(newUser.phoneNumber)}
            fullWidth
            margin="normal"
            error={!!phoneError}
            helperText={phoneError}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const phone = unformatPhone(evt.target.value);

              setPhoneError(
                phone.length !== 10 ? 'Enter full phone number' : ''
              );

              setNewUser({
                ...newUser,
                phoneNumber: unformatPhone(phone),
              });
            }}
          />
          <Divider />
          <Input
            className="create-field"
            type="password"
            label="Password:"
            value={newUser.password}
            fullWidth
            error={!!passwordError}
            helperText={passwordError}
            margin="normal"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const pw = evt.target.value.trim();
              setPasswordError(
                pw.length < 5 ? 'Password must be at least length 5' : ''
              );
              setNewUser({
                ...newUser,
                password: evt.target.value.trim(),
              });
            }}
          />

          <Input
            className="create-field"
            type="password"
            label="Confirm Password:"
            value={newUser.passwordConfirm}
            error={!!passwordConfrimError}
            helperText={passwordConfrimError}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const passwordConfirm = evt.target.value.trim();
              setNewUser({
                ...newUser,
                passwordConfirm: passwordConfirm,
              });
            }}
          />

          <Box textAlign="center" mt={3}>
            <Button
              disabled={!isValid}
              size="large"
              variant="contained"
              color="primary"
              onClick={() => void onAdd(newUser)}
            >
              SIGN UP
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export const CreateUser = withTheme(styled(UnstyledCreate)`
  .login-title {
    font-size: 2em;
    font-weight: bold;
  }

  .create-form {
    padding: 20px;
    border: 2px solid rgba(142, 142, 147, 0.2);
  }

  .create-field {
    width: 500px;
  }
`);
