import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import { useLocation, useHistory } from 'react-router-dom';

import { UserInput, User, ACCOUNTSTATUS } from '../types/user';
import { CreateUser } from '../components/create/CreateUser';
import {
  REGISTER_USER,
  RegisterUserDataResult,
  RegisterUserDataInput,
} from '../graphql/users/register_user.mutation';
import {
  GET_USER,
  UserQueryData,
  UserQueryVariable,
} from '../graphql/users/get_user.query';
import { parseError } from '../graphql/client';
import { ViewerContext } from '../context/homeViewer';
import { ErrorAlert } from '../components/alert_msg/Alerts';

interface CreateProps {
  className?: string;
}

/**
 * Main page for create user.
 */

export const Create: FunctionComponent<CreateProps> = ({ className }) => {
  const { viewer, setViewer } = useContext(ViewerContext);

  const [user, setUser] = useState<User>();
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const encryptedUserId = query.get('token');
  const [error, setError] = useState('');
  const redirectState = history.location.state as { [key: string]: string };

  // Create user mut.
  const [registerUserMut] = useMutation<
    RegisterUserDataResult,
    RegisterUserDataInput
  >(REGISTER_USER);

  // Get Teams data.
  const [userQuery, userQueryObj] = useLazyQuery<
    UserQueryData,
    UserQueryVariable
  >(GET_USER, {
    errorPolicy: 'all',
    onError() {
      if (!viewer.user) {
        history.replace({
          pathname: '/login',
          state: { redirectPath: '/create' },
        });
        return;
      }
      history.replace({ pathname: '/dashboard' });
      return;
    },
  });

  useEffect(() => {
    if (encryptedUserId) {
      userQuery({ variables: { encryptedUserId: encryptedUserId } });
    } else {
      if (!viewer.user) {
        // If no token was passed in, redirect to login.
        history.replace({
          pathname: '/login',
        });
        return;
      }

      // If user is logged in, redirect to home page.
      history.replace({
        pathname: '/',
      });
      return;
    }
  }, [encryptedUserId, viewer]);

  useEffect(() => {
    if (redirectState?.msg) {
      setError(redirectState.msg);
    }
  }, [redirectState]);

  // Pull league data.
  useEffect(() => {
    // If no error/loading set values.
    if (!userQueryObj.loading && userQueryObj?.data?.getUser) {
      // If user status is in 'registering team', redirect them.
      if (
        userQueryObj?.data?.getUser.status === ACCOUNTSTATUS.REGISTERINGTEAM
      ) {
        // If user was already registered
        history.replace({ pathname: '/registerteam' });
        return;
      }

      if (userQueryObj?.data?.getUser.status === ACCOUNTSTATUS.COMPLETED) {
        // If user was already registered
        history.replace({ pathname: '/dashboard' });
        return;
      }

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
        const res = await registerUserMut({
          variables: {
            id: user.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            dob: newUser.dob,
            password: newUser.password,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
          },
        });

        // If success, redirect to team edit page
        if (res.data?.registerUser) {
          setViewer({ ...viewer, user: res.data.registerUser });
          history.push(`/registerteam`);
        }
      } catch (e) {
        setError(parseError(e));
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

      <ErrorAlert msg={error} resetMsg={() => setError('')} />
    </Box>
  );
};
