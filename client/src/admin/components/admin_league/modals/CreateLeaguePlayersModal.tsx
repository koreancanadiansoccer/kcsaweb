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
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import dayjs from 'dayjs';

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
import { LEAGUE_TEAM_STATUS } from '../../../../types/team';
import { LeagueContext } from '../../../../context/league';

interface CreateLeaguePlayersModalProps
  extends Pick<DialogProps, 'open' | 'onClose' | 'fullScreen'> {
  selectedTeamId: number;
}

// NOTE: This is used as Update league team as well
export const CreateLeaguePlayersModal: FunctionComponent<CreateLeaguePlayersModalProps> =
  ({ selectedTeamId, open, onClose, fullScreen }) => {
    const { league: origLeague, setLeague: setOrigLeague } =
      useContext(LeagueContext);

    const selectedTeam = useMemo(
      () =>
        find(
          origLeague.leagueTeams,
          (leagueTeam) => leagueTeam.id === selectedTeamId
        ),
      [origLeague, selectedTeamId]
    );

    const [registerComplete, setRegisterComplete] = useState(
      selectedTeam?.status === LEAGUE_TEAM_STATUS.REGISTERED
    );

    const [leaguePlayers, setLeaguePlayers] = useState<LeaguePlayer[]>(
      selectedTeam?.leaguePlayers || []
    );

    // Update list
    useEffect(() => {
      setLeaguePlayers(selectedTeam?.leaguePlayers || []);
      setRegisterComplete(
        selectedTeam?.status === LEAGUE_TEAM_STATUS.REGISTERED
      );
    }, [origLeague, selectedTeam]);

    const [newLeaguePlayers, setNewLeaguePlayers] = useState<
      LeaguePlayerInput[]
    >([]);

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

    const createLeaguePlayers = useCallback(
      async (registerComplete?: boolean) => {
        if (!selectedTeam) {
          return 'no team';
        }

        try {
          const res = await createLeaguePlayerMut({
            variables: {
              newLeaguePlayers: newLeaguePlayers,
              completeRegister: registerComplete,
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
      },
      [newLeaguePlayers, selectedTeam, origLeague]
    );

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
        <Box my={3}>
          <Typography variant="h6">
            Current league team invitaional status:
            <Chip
              label={selectedTeam?.status}
              style={{
                backgroundColor:
                  (selectedTeam?.status === LEAGUE_TEAM_STATUS.REGISTERED &&
                    'seagreen') ||
                  (selectedTeam?.status === LEAGUE_TEAM_STATUS.CLUBCONFIRMED &&
                    'orange') ||
                  '',
                color:
                  (selectedTeam?.status === LEAGUE_TEAM_STATUS.REGISTERED &&
                    'white') ||
                  (selectedTeam?.status === LEAGUE_TEAM_STATUS.CLUBCONFIRMED &&
                    'white') ||
                  '',
              }}
            />
          </Typography>

          <Typography variant="body2">
            *Complete League Team Registration.
          </Typography>

          <Typography variant="body2" color="error">
            *You cannot undo this.
          </Typography>

          <Checkbox
            checked={registerComplete}
            disabled={registerComplete}
            color="primary"
            onChange={() => {
              createLeaguePlayers(!registerComplete);
            }}
          />
        </Box>

        <Box my={3}>
          <Divider />
        </Box>

        <Typography variant="h6">Add League Players</Typography>

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
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          openTo={'year'}
                          autoOk
                          variant="inline"
                          inputVariant="outlined"
                          label="DOB"
                          format="MM/dd/yyyy"
                          placeholder="mm/dd/yyyy"
                          error={!newLeaguePlayer?.dob}
                          value={newLeaguePlayer.dob}
                          InputAdornmentProps={{ position: 'start' }}
                          onChange={(date) => {
                            const copy = [...newLeaguePlayers];
                            copy[idx] = { ...copy[idx], dob: date };

                            setNewLeaguePlayers(copy);
                          }}
                        />
                      </MuiPickersUtilsProvider>
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
                { firstName: '', lastName: '', dob: null },
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
