import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';
import Box from '@material-ui/core/Box';
import findIndex from 'lodash/findIndex';
import AddIcon from '@material-ui/icons/Add';

import { Button } from '../../button/Button';
import { Table } from '../../table/Table';
import { LeaguePlayer } from '../../../types/player';
import { DashboardViewerContext } from '../../../context/dashboardViewer';

import { DashboardCreateLeaguePlayerModal } from './modals/DashboardCreateLeaguePlayerModal';

enum MODAL_TYPE {
  CREATE_TEAM = 'CREATE_TEAM',
  INVITE_TEAM = 'INVITE_TEAM',
  ADD_PLAYERS = 'ADD_PLAYERS',
}

export const DashboardLeagueGeneral: FunctionComponent = () => {
  const { dashboardViewer } = useContext(DashboardViewerContext);

  const [leaguePlayers, setLeaguePlayers] = useState(
    dashboardViewer.leagueTeam?.leaguePlayers || []
  );

  const [openModal, setOpenModal] = useState<MODAL_TYPE | null>(null);

  useEffect(() => {
    setLeaguePlayers(dashboardViewer.leagueTeam?.leaguePlayers || []);
  }, [dashboardViewer]);

  // Table columns to show.
  const tableColumns = [
    {
      title: 'Count',
      render: (rowData: LeaguePlayer) => {
        const idx = findIndex(
          leaguePlayers,
          (leaguePlayer) => leaguePlayer.id === rowData.id
        );
        return idx + 1;
      },
    },
    {
      title: 'Name',
      render: (rowData: LeaguePlayer) => {
        return `${rowData.player.firstName} ${rowData.player.lastName}`.toUpperCase();
      },
    },
    {
      title: 'Date of Birth',
      render: (rowData: LeaguePlayer) => {
        return rowData.player.dob;
      },
    },
    {
      title: 'Waiver',
      render: (rowData: LeaguePlayer) => {
        return rowData.signedWaiver ? 'Yes' : 'No';
      },
    },
    { title: 'Goals', field: 'goalScored' },
    { title: 'Yellow', field: 'yellowCard' },
    { title: 'Created', field: 'createdAt' },
  ];

  return (
    <>
      {openModal === MODAL_TYPE.ADD_PLAYERS && (
        <DashboardCreateLeaguePlayerModal
          open={openModal === MODAL_TYPE.ADD_PLAYERS}
          onClose={() => setOpenModal(null)}
        />
      )}

      <Box>
        <Box mb={3}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(MODAL_TYPE.ADD_PLAYERS)}
            color="secondary"
          >
            Add League Player
          </Button>
        </Box>

        <Table
          title="League Squad"
          columns={tableColumns}
          data={leaguePlayers}
        />
      </Box>
    </>
  );
};
