import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import { useLocation, useHistory } from 'react-router-dom';

import { UserInput, User } from '../types/user';
import { CreateUser } from '../components/create/CreateUser';
import {
  CREATE_USER,
  CreateUserDataResult,
  CreateUserDataInput,
} from '../graphql/users/create_users.mutation';
import {
  GET_USER,
  UserQueryData,
  UserQueryVariable,
} from '../graphql/users/get_user.query';
import { parseError } from '../graphql/client';

interface CreateProps {
  className?: string;
}

/**
 * Main page for create user.
 */

export const Create: FunctionComponent<CreateProps> = ({ className }) => {
  const [user, setUser] = useState<User>();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const encryptedUserId = query.get('token');

  // Create user mut.
  const [createUserMut] = useMutation<
    CreateUserDataResult,
    CreateUserDataInput
  >(CREATE_USER);

  // Get Teams data.
  const [userQuery, userQueryObj] = useLazyQuery<
    UserQueryData,
    UserQueryVariable
  >(GET_USER);

  useEffect(() => {
    if (encryptedUserId) {
      userQuery({ variables: { encryptedUserId: encryptedUserId } });
    } else {
      console.info('no encryptedUserId - should redirect to home page');
    }
  }, [encryptedUserId]);

  // Pull league data.
  useEffect(() => {
    // If no error/loading set values.
    if (userQueryObj?.data?.getUser) {
      setUser(userQueryObj.data.getUser);
    }
  }, [userQueryObj]);

  const createUser = useCallback(
    async (newUser: UserInput) => {
      if (!user?.id) {
        console.error('no id');
        return;
      }
      try {
        const res = await createUserMut({
          variables: {
            id: user.id,
            name: newUser.name,
            password: newUser.password,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
          },
        });

        // If success, redirect to team edit page
        if (res.data?.createUser) {
          history.push(`/teamedit/:${user.team.id}`);
        }
        // 로그인라우터로 이동 후 등록하면서 로그인
      } catch (e) {
        console.info(parseError(e));
      }
    },
    [user]
  );

  return (
    <Box className={className}>
      <CreateUser
        className="Create"
        origUser={user}
        onAdd={(newUser: UserInput) => createUser(newUser)}
      />
    </Box>
  );
};
