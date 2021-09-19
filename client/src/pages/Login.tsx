import React, { FunctionComponent, useState } from 'react';
import { withTheme } from "@material-ui/core/styles";
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import { LoginForm } from '../components/login/LoginForm';
interface LoginProps {
  className?: string;
}

/**
 * Login main page.
 */
const UnstyledLogin: FunctionComponent<LoginProps> = ({ className }) => {
  return (
    <>
      <LoginForm className='Login'/>
    </>
  )
}

export const Login = withTheme(styled(UnstyledLogin)``);
