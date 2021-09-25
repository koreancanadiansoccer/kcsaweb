import React, { FunctionComponent, useState } from 'react';
import { withTheme } from "@material-ui/core/styles";
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import { LoginInput } from "../types/login";
import {
  LOGIN_USER,
  LoginData,
  CreateLoginDataInput
} from "../graphql/login/login.mutation";
import { LoginForm } from '../components/login/LoginForm';
import { parseError } from '../graphql/client';
interface LoginProps {
  className?: string;
}

/**
 * Login main page.
 */

const UnstyledLogin: FunctionComponent<LoginProps> = ({ className }) => {
  const [loginUserMut, loginUserMutObj] = useMutation<
    LoginData,
    CreateLoginDataInput
  >(LOGIN_USER);

  const loginUser = async (newLogin: LoginInput) => {
    console.log('login sucessful')
    try {
      const res = await loginUserMut({
        variables: {
          email: newLogin.email,
          password: newLogin.password
        }
      });

      console.log('result');
      console.log(res);
    }catch(e) {
      const error = parseError(e);
      console.log('error');
      console.log(error);
    }
  };

  return (
    <>
      <LoginForm
        className='Login'
        onAdd={(newLogin: LoginInput) => loginUser(newLogin)}
      />
    </>
  );
};

export const Login = withTheme(styled(UnstyledLogin)``);
