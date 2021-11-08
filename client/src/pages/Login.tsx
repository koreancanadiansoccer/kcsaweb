import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import { LoginInput } from '../types/login';
import {
  LOGIN_USER,
  LoginData,
  CreateLoginDataInput,
} from '../graphql/login/login.mutation';
import { LoginForm } from '../components/login/LoginForm';
import { parseError } from '../graphql/client';
import { ACCOUNTSTATUS } from '../types/user';
import { ViewerContext } from '../context/homeViewer';

interface LoginProps {
  className?: string;
}

/**
 * Login main page.
 */

const UnstyledLogin: FunctionComponent<LoginProps> = () => {
  const history = useHistory();
  const { viewer, setViewer } = useContext(ViewerContext);
  const [loginUserMut] = useMutation<LoginData, CreateLoginDataInput>(
    LOGIN_USER
  );

  const [error, setError] = useState('');

  const loginUser = useCallback(
    async (newLogin: LoginInput) => {
      try {
        setError('');

        const res = await loginUserMut({
          variables: {
            email: newLogin.email,
            password: newLogin.password,
          },
        });

        if (res.data?.loginUser) {
          setViewer({ ...viewer, user: res.data.loginUser });
          // If admin, Redirect to admin.
          if (res.data?.loginUser.isAdmin) {
            history.replace({ pathname: '/admin' });
            return;
          }

          if (res.data?.loginUser.status === ACCOUNTSTATUS.INVITED) {
            history.replace({ pathname: '/create' });
            return;
          }

          // Redirect to register team if user have not finished this step.
          if (res.data?.loginUser.status === ACCOUNTSTATUS.REGISTERINGTEAM) {
            history.replace({ pathname: '/registerteam' });
            return;
          }

          const path = history.location.state as { [key: string]: string };
          const redirect = path?.redirectPath;
          if (redirect) {
            history.replace({ pathname: redirect });
            return;
          }

          history.replace({ pathname: '/' });
        }
      } catch (e) {
        setError(parseError(e));
      }
    },
    [loginUserMut]
  );

  return (
    <Box mb={10}>
      <LoginForm
        className="Login"
        error={error}
        onAdd={(newLogin: LoginInput) => loginUser(newLogin)}
      />
    </Box>
  );
};

export const Login = withTheme(styled(UnstyledLogin)``);
