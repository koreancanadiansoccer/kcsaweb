import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { useMutation } from '@apollo/client';
import AddIcon from '@material-ui/icons/Add';
import findIndex from 'lodash/findIndex';

import { CREATE_PLAYER } from '../../../graphql/players/create_player.mutation';
import { Team } from '../../../types/team';
import { TeamContext } from '../../../context/team';
import { Table } from '../../../components/table/Table';
import { Player, PlayerInput } from '../../../types/player';
import { Button } from '../../../components/button/Button';

import { CreateTeamPlayerModal } from './modals/CreateTeamPlayerModal';

/**
 * Show list of players.
 */
export const AdminTeamPlayers: FunctionComponent = () => {
  const { team: origTeam, setTeam: setOrigTeam } = useContext(TeamContext);

  const [players, setPlayers] = useState<Player[]>(origTeam.players || []);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [createPlayerMut] = useMutation<{ createPlayer: Player }, PlayerInput>(
    CREATE_PLAYER
  );

  /**
   * Orig team data can be updated from parent
   * Keep data in sync.
   */
  useEffect(() => {
    setPlayers(origTeam.players || []);
  }, [origTeam]);

  const createPlayer = useCallback(
    async (newPlayer: PlayerInput) => {
      try {
        const res = await createPlayerMut({
          variables: {
            name: newPlayer.name,
            dob: newPlayer.dob,
            teamId: origTeam.id,
          },
        });

        if (res.data) {
          const newPlayers = [...players, res.data.createPlayer];
          setOrigTeam({ ...origTeam, players: newPlayers });
          setOpenModal(false);
        }
      } catch (e) {
        console.info(e);
      }
    },
    [createPlayerMut, players]
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
    { title: 'Name', field: 'name' },
    { title: 'Date of Birth', field: 'dob' },
    { title: 'GoalScored', field: 'goalScored' },
    { title: 'Yellow', field: 'yellowCard' },
    { title: 'Created', field: 'createdAt' },
  ];

  return (
    <>
      <CreateTeamPlayerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newPlayer: PlayerInput) => createPlayer(newPlayer)}
      />

      <Box my={3}>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          color="secondary"
        >
          Create New Player
        </Button>
      </Box>

      <Table
        title="Players list"
        columns={tableColumns}
        data={players}
        options={{
          pageSize: 20,
        }}
      />
    </>
  );
};
