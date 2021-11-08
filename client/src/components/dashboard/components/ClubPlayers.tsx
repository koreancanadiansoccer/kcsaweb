import React, {
  FunctionComponent,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import findIndex from 'lodash/findIndex';
import { useMutation } from '@apollo/client';

import {
  UpdateDashboardInput,
  UpdateDashboardResult,
  UPDATE_DASHBOARD,
  STEPS,
} from '../../../graphql/update_dashboard.mutation';
import { DashboardViewerContext } from '../../../context/dashboardViewer';
import { Player, PlayerInput } from '../../../types/player';
import { Button } from '../../button/Button';
import { Table } from '../../table/Table';
import { parseError } from '../../../graphql/client';
import { ErrorAlert } from '../../alert_msg/Alerts';

import { CreatePlayerModal } from './modals/CreatePlayerModal';
import { UpdatePlayerModal } from './modals/UpdatePlayerModal';

enum MODALTYPE {
  CREATE_PLAYER = 'CREATE_PLAYER',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
}

export const ClubPlayers: FunctionComponent = () => {
  const { dashboardViewer, setDashboardViewer } = useContext(
    DashboardViewerContext
  );

  if (!dashboardViewer.team?.players) {
    return <Box>Could not find team</Box>;
  }
  const [openModal, setOpenModal] = useState<MODALTYPE | null>(null);

  const [error, setError] = useState('');
  const [players, setPlayers] = useState<Player[]>(
    dashboardViewer.team.players || []
  );

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInput>();

  useEffect(() => {
    if (dashboardViewer?.team?.players) {
      setPlayers(dashboardViewer.team.players);
    }
  }, [dashboardViewer]);

  const [updateDashboardMut] = useMutation<
    UpdateDashboardResult,
    UpdateDashboardInput
  >(UPDATE_DASHBOARD);

  const createPlayer = useCallback(
    async (updatePlayer: PlayerInput) => {
      try {
        if (!dashboardViewer.user) {
          setError('Error - please refresh');
          return;
        }

        const res = await updateDashboardMut({
          variables: {
            id: dashboardViewer.user.id,
            step: STEPS.UPDATEPLAYER,
            player: updatePlayer,
          },
        });

        // If success, redirect to team edit page
        if (res.data?.updateDashboard) {
          setDashboardViewer(res.data?.updateDashboard);
          setOpenModal(null);
        }
      } catch (e) {
        setError(parseError(e));
      }
    },
    [dashboardViewer]
  );

  // Table columns to show.
  const tableColumns = [
    {
      title: 'Count',
      render: (rowData: Player) => {
        const idx = findIndex(players, (player) => player.id === rowData.id);
        return idx + 1;
      },
    },
    {
      title: 'Name',
      render: (rowData: Player) => {
        return `${rowData.firstName} ${rowData.lastName}`.toUpperCase();
      },
    },
    { title: 'D.O.B', field: 'dob' },
    { title: 'Goals', field: 'goalScored' },
    { title: 'Yellow', field: 'yellowCard' },
    { title: 'Created', field: 'createdAt' },
  ];

  return (
    <>
      {openModal === MODALTYPE.CREATE_PLAYER && (
        <CreatePlayerModal
          open={openModal === MODALTYPE.CREATE_PLAYER}
          onClose={() => setOpenModal(null)}
          onAdd={(newPlayer: PlayerInput) => createPlayer(newPlayer)}
        />
      )}

      {openModal === MODALTYPE.UPDATE_PLAYER && selectedPlayer && (
        <UpdatePlayerModal
          open={openModal === MODALTYPE.UPDATE_PLAYER}
          onClose={() => setOpenModal(null)}
          onAdd={(updatePlayer: PlayerInput) => createPlayer(updatePlayer)}
          selectedPlayer={selectedPlayer}
        />
      )}

      <Box my={3}>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(MODALTYPE.CREATE_PLAYER)}
          color="secondary"
        >
          Create New Player
        </Button>
      </Box>

      <Table
        title="Players list"
        columns={tableColumns}
        data={players}
        onRowClick={(evt, data) => {
          if (data?.id) {
            setSelectedPlayer(data);
            setOpenModal(MODALTYPE.UPDATE_PLAYER);
          }
        }}
        options={{
          pageSize: 20,
        }}
      />
      <ErrorAlert msg={error} resetMsg={() => setError('')} />
    </>
  );
};
