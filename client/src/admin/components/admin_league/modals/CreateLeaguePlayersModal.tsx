import React, {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
  ChangeEvent,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import find from 'lodash/find';
import pick from 'lodash/pick';
import findIndex from 'lodash/findIndex';
import every from 'lodash/every';
import filter from 'lodash/filter';
import { useMutation, useQuery } from '@apollo/client';
import Divider from '@material-ui/core/Divider';

import {
  CREATE_LEAGUE_PLAYER,
  CreateLeaguePlayerOutput,
  CreateLeaguePlayerInput,
} from '../../../../graphql/players/create_league_player.mutation';
import { GET_PLAYERS } from '../../../../graphql/players/get_players.query';
import { Modal } from '../../../../components/modal/Modal';
import { Button } from '../../../../components/button/Button';
import { Select } from '../../../../components/select/Select';
import { Input } from '../../../../components/input/Input';
import { Table } from '../../../../components/table/Table';
import {
  Player,
  LeaguePlayer,
  LeaguePlayerInput,
} from '../../../../types/player';
import { LeagueContext } from '../../../../context/league';

interface CreateLeaguePlayersModalProps
  extends Pick<DialogProps, 'open' | 'onClose' | 'fullScreen'> {
  selectedTeamId: number;
}

export const CreateLeaguePlayersModal: FunctionComponent<CreateLeaguePlayersModalProps> = ({
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

  const [newLeaguePlayers, setNewLeaguePlayers] = useState<LeaguePlayerInput[]>(
    []
  );

  const isValid = useMemo(() => {
    if (!newLeaguePlayers || newLeaguePlayers.length === 0) return false;
    if (!newLeaguePlayers || newLeaguePlayers.length > 0) {
      const valid = every(
        newLeaguePlayers,
        (newLeaguePlayer) =>
          !!newLeaguePlayer.firstName &&
          !!newLeaguePlayer.lastName &&
          !!newLeaguePlayer.dob
      );
      return valid;
    }

    return true;
  }, [newLeaguePlayers]);

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
          leagueId: origLeague.id,
        },
      });

      if (res?.data?.createLeaguePlayers) {
        setOrigLeague(res.data?.createLeaguePlayers);

        // Reset selection:
        setNewLeaguePlayers([]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [newLeaguePlayers, selectedTeam, origLeague]);

  // Create option list for select.
  const playersOption = useMemo(() => {
    // Filter out already added players.
    const filteredChosen = filter(
      teamPlayersQuery.data?.getPlayers,
      (player) =>
        !find(
          selectedTeam?.leaguePlayers,
          (leaguePlayer) => leaguePlayer.playerId === player.id
        )
    );

    // Filter out already added players.
    return map(filteredChosen, (player) => ({
      label: `${player.firstName} ${player.lastName}`,
      value: player.id.toString(),
    }));
  }, [teamPlayersQuery, leaguePlayers]);

  /**
   * Handle option selection change.
   */
  const handleChange = useCallback(
    // eslint-disable-next-line
    async (selectedOption: any) => {
      const origTeamPlayers = teamPlayersQuery.data?.getPlayers;

      const newLeaguePlayers = map(selectedOption, (selected) => {
        // Check if players from original team are selected
        const teamPlayer = find(
          origTeamPlayers,
          (teamPlayer) => teamPlayer.id.toString() === selected.value
        );

        if (teamPlayer) {
          return {
            ...pick(teamPlayer, ['id', 'firstName', 'lastName', 'dob']),
          };
        }

        // If newly entered, just set the name.
        return { firstName: selected.firstName, lastName: selected.lastName };
      });

      setNewLeaguePlayers(newLeaguePlayers);
    },
    [teamPlayersQuery, setNewLeaguePlayers]
  );

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
        return `${rowData.player.firstName} ${rowData.player.lastName}`;
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
    { title: 'GoalScored', field: 'goalScored' },
    { title: 'Yellow', field: 'yellowCard' },
    { title: 'Created', field: 'createdAt' },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      title={`${
        selectedTeam?.team.name || 'Team'
      } - List of players in this league.`}
    >
      <Typography variant="body1">Add players from past</Typography>

      <Box width="100%" my={2}>
        <Typography variant="body1">
          List of originally added players in the past.
        </Typography>
        <Typography variant="body2" color="error">
          *Already added players will not be shown under the option list.
        </Typography>

        <Select options={playersOption} isMulti handleChange={handleChange} />
      </Box>

      <Divider />
      <Box my={2}>
        {/* Adding totally new players */}
        {newLeaguePlayers.length >= 1 &&
          map(newLeaguePlayers, (newLeaguePlayer, idx) => {
            return (
              !newLeaguePlayer.id && (
                <Box
                  display="flex"
                  alignItems="center"
                  key={`newplayer-${idx}`}
                >
                  <Box>
                    <Typography variant="body1">Name</Typography>
                    <Input
                      label="First Name"
                      placeholder="Player name"
                      required
                      value={newLeaguePlayer.firstName}
                      fullWidth
                      onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        const copy = [...newLeaguePlayers];
                        copy[idx] = {
                          ...copy[idx],
                          firstName: evt.target.value,
                        };
                        setNewLeaguePlayers(copy);
                      }}
                    />

                    <Input
                      label="Last Name"
                      placeholder="Player name"
                      required
                      value={newLeaguePlayer.lastName}
                      fullWidth
                      onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        const copy = [...newLeaguePlayers];
                        copy[idx] = {
                          ...copy[idx],
                          lastName: evt.target.value,
                        };
                        setNewLeaguePlayers(copy);
                      }}
                    />
                  </Box>

                  <Box ml={1}>
                    <Typography variant="body1">DOB</Typography>
                    <Input
                      value={newLeaguePlayer.dob}
                      placeholder="date of birth"
                      type="date"
                      onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        const copy = [...newLeaguePlayers];
                        copy[idx] = { ...copy[idx], dob: evt.target.value };
                        setNewLeaguePlayers(copy);
                      }}
                    />
                  </Box>
                </Box>
              )
            );
          })}

        {/* Add new plyaers */}
        <Button
          size="large"
          onClick={() => {
            const newLeaguePlayerCopy = [
              ...newLeaguePlayers,
              { firstName: '', lastName: '', dob: '' },
            ];

            setNewLeaguePlayers(newLeaguePlayerCopy);
          }}
        >
          Click to add new players.
        </Button>
      </Box>
      <Divider />

      <Box my={2}>
        <Button
          disabled={!isValid}
          color="secondary"
          size="large"
          onClick={() => void createLeaguePlayers()}
        >
          Add Players to League
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
