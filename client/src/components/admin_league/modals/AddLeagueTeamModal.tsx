import React, {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import find from 'lodash/find';
import filter from 'lodash/filter';

import { Modal } from '../../modal/Modal';
import { Button } from '../../button/Button';
import { Select } from '../../select/Select';
import { Team, LeagueTeam } from '../../../types/team';

interface AddLeagueTeamModalProps
  extends Pick<DialogProps, 'open' | 'onClose'> {
  age: string;
  updateLeague: (newTeams: Team[]) => void;
  teams: Team[];
  leagueTeams: LeagueTeam[];
}

/**
 * Modal to handle team additino to the league.
 */
export const AddLeagueTeamModal: FunctionComponent<AddLeagueTeamModalProps> = ({
  open,
  age,
  teams,
  leagueTeams,
  onClose,
  updateLeague,
}) => {
  // Init state for new product.
  const [newTeams, setNewTeams] = useState<Team[]>([]);

  // Create option list for select.
  const teamsOption = useMemo(() => {
    // Filter out already added team.
    const filteredAdded = filter(teams, (team) => {
      const added = find(
        leagueTeams,
        (leagueTeam) => leagueTeam.teamId === team.id
      );

      return added ? undefined : team;
    });

    return filteredAdded
      ? map(filteredAdded as Team[], (team) => ({
          label: team.name,
          value: team.id.toString(),
        }))
      : [];
  }, [teams, leagueTeams]);

  const isValid = useMemo(() => newTeams.length !== 0, [newTeams]);

  // Reset 'newLeague' when closing/opening the modal.
  useEffect(() => setNewTeams([]), [open]);

  // Grab original team data when user selects teams.

  const handleChange = useCallback(
    // eslint-disable-next-line
    async (selectedOption: any) => {
      const newTeams = map(selectedOption, (selected) => {
        const newTeam = find(
          teams,
          (team) => team.id === parseInt(selected.value)
        ) as Team;

        return { ...newTeam };
      });

      setNewTeams(newTeams);
    },
    [teams]
  );

  return (
    <Modal open={open} onClose={onClose} title="Create a Club">
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="start"
        flexDirection="column"
      >
        <Typography variant="body1">Select Clubs from {age} age</Typography>

        <Typography variant="body2">
          *Clubs that were already added to this league will not be shown.
        </Typography>

        <Typography variant="body2" color="error">
          {`To add a new team joining for first time,\nPlease create a club under 'Clubs' menu on sidebar first`}
        </Typography>

        <Box width="100%" my={2}>
          <Select options={teamsOption} isMulti handleChange={handleChange} />
        </Box>

        <DialogActions>
          <Button
            disabled={!isValid}
            size="large"
            onClick={() => void updateLeague(newTeams)}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
