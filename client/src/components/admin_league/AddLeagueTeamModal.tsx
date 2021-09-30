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
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import map from "lodash/map";
import find from "lodash/find";
import reduce from "lodash/reduce";

import { Modal } from "../modal/Modal";
import { Button } from "../button/Button";

import { Team } from "../../types/team";

interface AddLeagueTeamModalProps
  extends Pick<DialogProps, "open" | "onClose"> {
  updateLeague: (newTeams: Team[]) => void;
  teams: Team[];
}

/**
 * Modal to handle league addition.
 */
export const AddLeagueTeamModal: FunctionComponent<AddLeagueTeamModalProps> = ({
  open,
  teams,
  onClose,
  updateLeague,
}) => {
  // Init state for new product.
  const [newLeagueTeams, setNewLeagueTeams] = useState<Team[]>([]);

  const teamsOption = useMemo(() => {
    return map(teams, (team) => ({ name: team.name, id: team.id }));
  }, [teams]);

  const isValid = useMemo(() => newLeagueTeams.length !== 0, [newLeagueTeams]);

  // Reset 'newLeague' when closing/opening the modal.
  useEffect(() => setNewLeagueTeams([]), [open]);

  const handleChange = (e: any) => {
    const teamsAdded = reduce(
      e.target.value,
      (result: Team[], selectedId) => {
        const team = find(teams, { id: selectedId });
        if (team) {
          result.push(team);
        }
        return result;
      },
      []
    );

    if (teamsAdded) {
      setNewLeagueTeams(teamsAdded);
    }
  };

  //TODO: Highlight selected team.
  // const getOptionFont = (
  //   name: string,
  //   newLeagueTeams: { value: string; name: string }[]
  // ): React.CSSProperties => {
  //   return {
  //     fontWeight:
  //       find(newLeagueTeams, { value: name }) === -1 ? "normal" : "bold",
  //   };
  // };

  return (
    <Modal open={open} onClose={onClose} title="Add Teams">
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="start"
        flexDirection="column"
      >
        <Typography variant="body1">Select Teams from Open age</Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <FormControl fullWidth>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              fullWidth
              value={newLeagueTeams}
              onChange={(e: any) => handleChange(e)}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected: string[] | any) => {
                return (
                  <div>
                    {selected.map((value: any) => (
                      <Chip key={value.id} label={value.name} />
                    ))}
                  </div>
                );
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
            >
              {teamsOption.map((teamOption) => (
                <MenuItem
                  key={teamOption.name}
                  value={teamOption.id}
                  // style={getOptionFont(teamOption.name, newLeagueTeams)}
                >
                  {teamOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
