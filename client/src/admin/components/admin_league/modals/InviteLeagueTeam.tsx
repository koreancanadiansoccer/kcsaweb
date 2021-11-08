import React, {
  FunctionComponent,
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import map from 'lodash/map';
import find from 'lodash/find';
import { useMutation } from '@apollo/client';

import {
  INVITE_LEAGUETEAM,
  InviteLeagueTeamResult,
  InviteLeagueTeamInput,
} from '../../../../graphql/league/invite_leagueteam.mutation';
import { Team, LeagueTeam } from '../../../../types/team';
import { Modal } from '../../../../components/modal/Modal';
import { Button } from '../../../../components/button/Button';
import { Select } from '../../../../components/select/Select';
import { LeagueContext } from '../../../../context/league';

interface InviteLeagueTeamProps extends Pick<DialogProps, 'open' | 'onClose'> {
  age: string;
  teams: Team[];
  leagueTeams: LeagueTeam[];
}

export const InviteLeagueTeamModal: FunctionComponent<InviteLeagueTeamProps> =
  ({ open, age, teams, leagueTeams, onClose }) => {
    const { league: origLeague, setLeague: setOrigLeague } =
      useContext(LeagueContext);

    // Init state for new product.
    const [newTeam, setNewTeam] = useState<Team>();

    const isValid = useMemo(
      () => newTeam && newTeam?.captain?.email,
      [newTeam]
    );

    // Craete new players.
    const [inviteNewLeagueTeam] = useMutation<
      InviteLeagueTeamResult,
      InviteLeagueTeamInput
    >(INVITE_LEAGUETEAM);

    const inviteLeagueTeam = useCallback(async () => {
      if (!newTeam) {
        return 'no team';
      }

      try {
        const res = await inviteNewLeagueTeam({
          variables: {
            teamId: newTeam?.id,
            leagueId: origLeague.id,
          },
        });

        if (res?.data?.inviteLeagueTeam) {
          setOrigLeague(res?.data?.inviteLeagueTeam);

          if (onClose) {
            onClose({}, 'backdropClick');
          }
        }
      } catch (e) {
        console.error(e);
      }
    }, [newTeam, origLeague, setOrigLeague, onClose]);

    // Create option list for select.
    const teamsOption = useMemo(() => {
      // // Filter out already added team.
      // const filteredAdded = filter(teams, (team) => {
      //   const added = find(
      //     leagueTeams,
      //     (leagueTeam) => leagueTeam.teamId === team.id
      //   );

      //   return added ? undefined : team;
      // });

      // return filteredAdded
      //   ? map(filteredAdded as Team[], (team) => ({
      //       label: team.name,
      //       value: team.id.toString(),
      //     }))
      //   : [];

      return map(teams as Team[], (team) => ({
        label: team.name,
        value: team.id.toString(),
      }));
    }, [teams, leagueTeams]);

    const handleChange = useCallback(
      // eslint-disable-next-line
      async (selectedOption: any) => {
        const teamTemp = find(
          teams,
          (team) => team.id === parseInt(selectedOption.value)
        ) as Team;

        setNewTeam(teamTemp);
      },
      [teams]
    );

    return (
      <Modal open={open} onClose={onClose} title="Invite Club">
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="start"
          flexDirection="column"
        >
          <Typography variant="body1">Select Clubs from {age} age</Typography>

          <Typography variant="body2">
            *Clubs that were already added can be used to resend invitation.
          </Typography>

          <Typography variant="body2" color="error">
            {`To add a new team joining for first time,\nPlease invite the captain or create a club under 'Clubs' menu on sidebar first`}
          </Typography>

          <Box width="100%" my={2}>
            <Select options={teamsOption} handleChange={handleChange} />
          </Box>

          {newTeam && (
            <Box my={1}>
              {newTeam?.captain?.email ||
              newTeam?.captain?.firstName ||
              newTeam?.captain?.lastName ? (
                <Box fontSize={16}>
                  <Box>Captain info:</Box>
                  <Box>
                    Name:{' '}
                    {`${newTeam?.captain.firstName}  ${newTeam?.captain.lastName} `}
                  </Box>
                  <Box>email: {newTeam?.captain.email}</Box>
                </Box>
              ) : (
                <>
                  <Typography color="error">No captain data exists</Typography>
                  <Typography color="error">
                    Please add this team manually or assign a captain
                  </Typography>
                </>
              )}
            </Box>
          )}

          <DialogActions>
            <Button
              disabled={!isValid}
              size="large"
              onClick={() => void inviteLeagueTeam()}
            >
              Invite
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    );
  };
