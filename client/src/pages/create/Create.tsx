import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import { UserInput } from "../../types/create_user";
import { CreateUser } from '../../components/create/CreateUser';
import {
  CREATE_USER,
  UserData,
  CreateUserDataInput
} from "../../graphql/users/create_users.mutation";
import { parseError } from '../../graphql/client';

interface CreateProps {
  className?: string;
}

/**
 * main page for create user.
 */

const UnstyledCreate: FunctionComponent<CreateProps> = ({ className }) => {
  const [createUserMut, createUserMutObj] = useMutation<
    UserData,
    CreateUserDataInput
  >(CREATE_USER);

  const createUser = async (newUser: UserInput) => {
    console.log('create user');
    try {
      const res = await createUserMut({
        variables: {
          name: newUser.name,
          password: newUser.password,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
        },
      });

      // 로그인라우터로 이동 후 등록하면서 로그인

      console.log('result!');
      console.log(res);
    } catch (e) {
      const error = parseError(e);
      console.log('error');
      console.log(error);
    }
  };

  return (
    <>
      <CreateUser
        className="Create"
        onAdd={(newUser: UserInput) => createUser(newUser)}
      />
    </>
  );
};

export const Create = withTheme(styled(UnstyledCreate)``);
