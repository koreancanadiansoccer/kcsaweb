import React, { FunctionComponent, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useMutation, useQuery } from '@apollo/client';

import { Table } from '../../components/table/Table';
import { Loader } from '../../components/loader/Loader';
import { Button } from '../../components/button/Button';
import { ErrorAlert } from '../../components/errorAlert/ErrorAlert';
import { InviteNewCaptainModal } from '../components/admin_users/InviteCaptainModal';
import { User, NewCaptain } from '../../types/user';
import { GET_USERS, GetUsersResult } from '../../graphql/users/get_users.query';
import {
  SendInviteInput,
  SendInviteResult,
  SEND_INVITE,
} from '../../graphql/users/invite_captain.mutation';
import { parseError } from '../../graphql/client';
import { formatPhone } from '../../utils/format';

enum MODAL_TYPE {
  INVITE_CAPTAIN = 'INVITE_CAPTAIN',
  EDIT_CAPTAIN = 'EDIT_CAPTAIN',
}

const tableColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'email' },
  {
    title: 'Phone ',
    render: (user: User) => {
      return formatPhone(user.phoneNumber);
    },
  },
  { title: 'Status', field: 'status' },
];

export const Users: FunctionComponent = () => {
  // Get League data.
  const userDataQuery = useQuery<GetUsersResult>(GET_USERS);
  const [sendInviteMut] = useMutation<SendInviteResult, SendInviteInput>(
    SEND_INVITE
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>();

  const [openModal, setOpenModal] = useState<MODAL_TYPE | null>(null);

  useEffect(() => {
    setLoading(userDataQuery.loading);

    if (!loading && userDataQuery?.data?.getUsers) {
      setUsers(userDataQuery.data.getUsers);
    }
  }, [userDataQuery, loading]);

  const sendInvite = async (newCaptain: NewCaptain) => {
    setLoading(true);
    try {
      const res = await sendInviteMut({
        variables: {
          ...newCaptain,
        },
      });
      if (res.data) {
        setUsers(res.data.sendInvite);
        setOpenModal(null);
      }
    } catch (e) {
      setError(parseError(e));
    }
  };

  if (loading || !users) return <Loader open={loading} />;
  // if (!users) return <Box> Please try again</Box>;
  return (
    <>
      {openModal === MODAL_TYPE.INVITE_CAPTAIN && (
        <InviteNewCaptainModal
          open={openModal === MODAL_TYPE.INVITE_CAPTAIN}
          onClose={() => setOpenModal(null)}
          onSubmit={(newCaptain) => sendInvite(newCaptain)}
        />
      )}
      <Box>
        <Typography variant="h4">Users/Captains</Typography>

        <Box my={3}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(MODAL_TYPE.INVITE_CAPTAIN)}
            color="secondary"
          >
            Invite New Captain
          </Button>
        </Box>

        <Table
          title="Users"
          columns={tableColumns}
          data={users}
          options={{
            pageSize: 10,
            rowStyle: (data) => {
              return data.status === 'INVITED'
                ? { background: '#EEEEEE' }
                : { background: 'white' };
            },
          }}
        />

        <ErrorAlert error={error} resetError={() => setError('')} />
      </Box>
    </>
  );
};
