import React, {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import find from 'lodash/find';
import pick from 'lodash/pick';
import findIndex from 'lodash/findIndex';
import { useMutation, useQuery } from '@apollo/client';

import {
  CREATE_LEAGUE_PLAYER,
  CreateLeaguePlayerOutput,
  CreateLeaguePlayerInput,
} from '../../../graphql/players/create_league_player.mutation';
import { GET_PLAYERS } from '../../../graphql/players/get_players.query';
import { Modal } from '../../modal/Modal';
import { Button } from '../../button/Button';
import { Select } from '../../select/Select';
import { Table } from '../../table/Table';
import { Player, LeaguePlayer, LeaguePlayerInput } from '../../../types/player';
import { LeagueContext } from '../../../context/league';

interface AddLeaguePlayersModalProps
  extends Pick<DialogProps, 'open' | 'onClose' | 'fullScreen'> {
  selectedTeamId: number;
}

// Table columns to show.
const tableColumns = [
  { title: 'Name', field: 'name' },
  { title: 'GoalScored', field: 'goalScored' },
  { title: 'Yellow', field: 'yellowCard' },
  { title: 'Created', field: 'createdAt' },
];

export const AddLeaguePlayersModal: FunctionComponent<AddLeaguePlayersModalProps> = ({
  selectedTeamId,
  open,
  onClose,
  fullScreen,
}) => {
  const { league: origLeague, setLeague: setOrigLeague } = useContext(
    LeagueContext
  );

  const selectedTeam = useMemo(
    () =>
      find(
        origLeague.leagueTeams,
        (leagueTeam) => leagueTeam.id === selectedTeamId
      ),
    [origLeague, selectedTeamId]
  );

  const [leaguePlayers, setLeaguePlayers] = useState<LeaguePlayer[]>(
    selectedTeam?.leaguePlayers || []
  );

  // Update list
  useEffect(() => {
    setLeaguePlayers(selectedTeam?.leaguePlayers || []);
  }, [origLeague, selectedTeam]);

  const [newLeaguePlayers, setNewLeaguePlayers] = useState<
    LeaguePlayerInput[]
  >();

  // Get all players for the team.
  const teamPlayersQuery = useQuery<
    { getPlayers: Player[] },
    { teamId: number }
  >(GET_PLAYERS, {
    variables: { teamId: selectedTeam?.teamId || 0 },
  });

  // Craete new players.
  const [createLeaguePlayerMut] = useMutation<
    CreateLeaguePlayerOutput,
    CreateLeaguePlayerInput
  >(CREATE_LEAGUE_PLAYER);

  const createLeaguePlayers = useCallback(async () => {
    if (!selectedTeam) {
      return 'no team';
    }

    try {
      const res = await createLeaguePlayerMut({
        variables: {
          newLeaguePlayers: newLeaguePlayers,
          leagueTeamId: selectedTeam?.id,
          teamId: selectedTeam?.teamId,
        },
      });

      if (res?.data?.createLeaguePlayers) {
        const newTeamPlayers = res.data.createLeaguePlayers;

        const origLeagueTeams = [...origLeague.leagueTeams];

        const leagueTeamIdx = findIndex(
          origLeagueTeams,
          (leagueTeam) => leagueTeam.id === selectedTeamId
        );

        origLeagueTeams[leagueTeamIdx] = {
          ...origLeagueTeams[leagueTeamIdx],
          leaguePlayers: newTeamPlayers,
        };

        setOrigLeague({ ...origLeague, leagueTeams: origLeagueTeams });

        // Reset selection:
        setNewLeaguePlayers(undefined);
      }
    } catch (e) {
      console.error(e);
    }
  }, [newLeaguePlayers, selectedTeam]);

  // Create option list for select.
  const playersOption = useMemo(() => {
    // Filter out already added players.
    return map(teamPlayersQuery.data?.getPlayers, (player) => ({
      label: player.name,
      value: player.id.toString(),
    }));
  }, [teamPlayersQuery]);

  /**
   * Handle option selection change.
   */
  const handleChange = useCallback(
    async (selectedOption: any) => {
      const origTeamPlayers = teamPlayersQuery.data?.getPlayers;

      const newLeaguePlayers = map(selectedOption, (selected) => {
        // Check if players from original team are selected
        const teamPlayer = find(
          origTeamPlayers,
          (teamPlayer) => teamPlayer.id === selected.value
        );

        if (teamPlayer) {
          return { ...pick(teamPlayer, ['id', 'name']) };
        }

        // If newly entered, just set the name.
        return { name: selected.label };
      });

      setNewLeaguePlayers(newLeaguePlayers);
    },
    [teamPlayersQuery, setNewLeaguePlayers]
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      title={`${
        selectedTeam?.name || 'Team'
      } - List of players in this league.`}
    >
      <Typography variant="body1">Add players</Typography>

      <Box width="100%" my={2}>
        <Typography variant="body1">
          List of originally added players in the past.
        </Typography>

        <Select
          createable
          options={playersOption}
          isMulti
          handleChange={handleChange}
        />
      </Box>

      <Box my={2}>
        <Button
          disabled={!newLeaguePlayers || newLeaguePlayers.length === 0}
          size="large"
          onClick={() => void createLeaguePlayers()}
        >
          Add Players
        </Button>
      </Box>

      <Table
        title="Players list"
        columns={tableColumns}
        data={leaguePlayers}
        options={{
          pageSize: 20,
        }}
      />
    </Modal>
  );
};
