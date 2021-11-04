import React, { FunctionComponent, useContext } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

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

  const loginUser = async (newLogin: LoginInput) => {
    try {
      const res = await loginUserMut({
        variables: {
          email: newLogin.email,
          password: newLogin.password,
        },
      });
      console.info(res);
      if (res.data?.loginUser) {
        setViewer({ ...viewer, user: res.data.loginUser });

        // Redirect to register team if user have not finished this step.
        if (res.data?.loginUser.status === ACCOUNTSTATUS.REGISTERINGTEAM) {
          history.replace({ pathname: '/registerteam' });
        }
      }
    } catch (e) {
      console.info(parseError(e));
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
