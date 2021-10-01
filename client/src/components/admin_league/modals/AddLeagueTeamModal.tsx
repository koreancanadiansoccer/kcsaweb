import React, {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { DialogProps } from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import map from "lodash/map";
import find from "lodash/find";
import filter from "lodash/filter";

import { Modal } from "../../modal/Modal";
import { Button } from "../../button/Button";
import { Select } from "../../select/Select";
import { Team, LeagueTeam } from "../../../types/team";

interface AddLeagueTeamModalProps
  extends Pick<DialogProps, "open" | "onClose"> {
  age: string;
  updateLeague: (newTeams: Team[]) => void;
  teams: Team[];
  leagueTeams: LeagueTeam[];
}

/**
 * Modal to handle league addition.
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
  const [newLeagueTeams, setNewLeagueTeams] = useState<Team[]>([]);

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
          value: team.id,
        }))
      : [];
  }, [teams, leagueTeams]);

  const isValid = useMemo(() => newLeagueTeams.length !== 0, [newLeagueTeams]);

  // Reset 'newLeague' when closing/opening the modal.
  useEffect(() => setNewLeagueTeams([]), [open]);

  // Grab original team data when user selects teams.
  const handleChange = useCallback(
    (selectedOption: any) => {
      const newTeams = map(selectedOption, (selected) => {
        const newTeam = find(
          teams,
          (team) => team.id === selected.value
        ) as Team;

        return { ...newTeam };
      });

      setNewLeagueTeams(newTeams);
    },
    [teams]
  );

  return (
    <Modal open={open} onClose={onClose} title="Add Teams">
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="start"
        flexDirection="column"
      >
        <Typography variant="body1">Select Teams from {age} age</Typography>

        <Typography variant="body2" color="error">
          *Teams that were already added will not be shown.
        </Typography>

        <Box width="100%" my={2}>
          <Select options={teamsOption} isMulti handleChange={handleChange} />
        </Box>

        <DialogActions>
          <Button
            disabled={!isValid}
            size="large"
            onClick={() => void updateLeague(newLeagueTeams)}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
