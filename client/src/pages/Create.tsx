import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import Box from '@material-ui/core/Box';

import { UserInput } from '../types/user';
import { CreateUser } from '../components/create/CreateUser';
import {
  CREATE_USER,
  UserData,
  CreateUserDataInput,
} from '../graphql/users/create_users.mutation';
import { parseError } from '../graphql/client';

interface CreateProps {
  className?: string;
}

/**
 * Main page for create user.
 */

export const Create: FunctionComponent<CreateProps> = ({ className }) => {
  const [createUserMut] = useMutation<UserData, CreateUserDataInput>(
    CREATE_USER
  );

  const createUser = async (newUser: UserInput) => {
    try {
      const res = await createUserMut({
        variables: {
          name: newUser.name,
          password: newUser.password,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
        },
      });
      console.info(res);
      // 로그인라우터로 이동 후 등록하면서 로그인
    } catch (e) {
      console.info(parseError(e));
    }
  };

  return (
    <Box className={className}>
      <CreateUser
        className="Create"
        onAdd={(newUser: UserInput) => createUser(newUser)}
      />
    </Box>
  );
};
