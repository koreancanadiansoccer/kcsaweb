import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Box from '@material-ui/core/Box';
import findIndex from 'lodash/findIndex';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import dayjs from 'dayjs';

import { Button } from '../../button/Button';
import { Table } from '../../table/Table';
import { AlertDeleteLeaguePlayerModal } from '../components/modals/AlertDeleteLeaguePlayerModal';
import { LeaguePlayer } from '../../../types/player';
import { DashboardViewerContext } from '../../../context/dashboardViewer';

import { DashboardCreateLeaguePlayerModal } from './modals/DashboardCreateLeaguePlayerModal';

enum MODAL_TYPE {
  ADD_LEAGUEPLAYERS = 'ADD_LEAGUEPLAYERS',
  DELETE_LEAGUEPLAYERS = 'DELETE_LEAGUEPLAYERS',
}

export const DashboardLeagueGeneral: FunctionComponent = () => {
  const { dashboardViewer } = useContext(DashboardViewerContext);

  const [leaguePlayers, setLeaguePlayers] = useState(
    dashboardViewer.leagueTeam?.leaguePlayers || []
  );

  const [deleteLeaguePlayerId, setDeleteLeaguePlayerId] = useState<number>();

  const [openModal, setOpenModal] = useState<MODAL_TYPE | null>(null);

  useEffect(() => {
    setLeaguePlayers(dashboardViewer.leagueTeam?.leaguePlayers || []);
  }, [dashboardViewer]);

  /**
   * Delete match
   */
  const deleteLeaguePlayer = useCallback(async (deletePlayerId: number) => {
    try {
      console.info(deletePlayerId);
    } catch (e) {
      console.error(e);
    }
  }, []);

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
        return dayjs(rowData.player.dob).format('MM/DD/YYYY');
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
  ];

  return (
    <>
      {openModal === MODAL_TYPE.ADD_LEAGUEPLAYERS && (
        <DashboardCreateLeaguePlayerModal
          open={openModal === MODAL_TYPE.ADD_LEAGUEPLAYERS}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === MODAL_TYPE.DELETE_LEAGUEPLAYERS &&
        deleteLeaguePlayerId && (
          <AlertDeleteLeaguePlayerModal
            deleteLeaguePlayerId={deleteLeaguePlayerId}
            open={openModal === MODAL_TYPE.DELETE_LEAGUEPLAYERS}
            onDelete={(deleteLeaguePlayerId: number) =>
              deleteLeaguePlayer(deleteLeaguePlayerId)
            }
            onClose={() => setOpenModal(null)}
          />
        )}

      <Box>
        <Box mb={3}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(MODAL_TYPE.ADD_LEAGUEPLAYERS)}
            color="secondary"
          >
            Add League Player
          </Button>
        </Box>

        <Table
          title="League Squad"
          columns={tableColumns}
          data={leaguePlayers}
          actions={[
            {
              icon: () => <DeleteOutline />,
              tooltip: 'Delete league player',
              onClick: (event, rowData) => {
                const leaguePlayer = rowData as LeaguePlayer;
                setDeleteLeaguePlayerId(leaguePlayer.id);
                setOpenModal(MODAL_TYPE.DELETE_LEAGUEPLAYERS);
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </Box>
    </>
  );
};
