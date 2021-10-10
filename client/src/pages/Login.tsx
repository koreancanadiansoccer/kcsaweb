import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import { LoginInput } from '../types/login';
import {
  LOGIN_USER,
  LoginData,
  CreateLoginDataInput,
} from '../graphql/login/login.mutation';
import { LoginForm } from '../components/login/LoginForm';
import { parseError } from '../graphql/client';
interface LoginProps {
  className?: string;
}

/**
 * Login main page.
 */

const UnstyledLogin: FunctionComponent<LoginProps> = () => {
  const [loginUserMut] = useMutation<LoginData, CreateLoginDataInput>(
    LOGIN_USER
  );

  const loginUser = async (newLogin: LoginInput) => {
    try {
      const res = await loginUserMut({
        variables: {
          email: newLogin.email,
          password: newLogin.password,
        },
      });
    } catch (e) {
      const error = parseError(e);
    }
  };

  return (
    <>
      <LoginForm
        className="Login"
        onAdd={(newLogin: LoginInput) => loginUser(newLogin)}
      />
    </>
  );
};

export const Login = withTheme(styled(UnstyledLogin)``);
