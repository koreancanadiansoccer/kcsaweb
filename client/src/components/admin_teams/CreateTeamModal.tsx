import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
} from "react";
import { DialogProps } from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

import { Modal } from "../modal/Modal";
import { Input } from "../input/Input";
import { Button } from "../button/Button";

import { TeamInput, TeamAgeType } from "../../types/team";

interface CreateTeamModalProp extends Pick<DialogProps, "open" | "onClose"> {
  onAdd: (newTeam: TeamInput) => Promise<void>;
}

/**
 * Modal to handle team creation.
 */
export const CreateTeamModal: FunctionComponent<CreateTeamModalProp> = ({
  open,
  onClose,
  onAdd,
}) => {
  // Init state for new product.
  const [newTeam, setNewTeam] = useState<TeamInput>({
    name: "",
    teamAgeType: "",
  });

  const isValid = useMemo(() => !!newTeam?.name && !!newTeam?.teamAgeType, [
    newTeam,
  ]);

  // Reset 'newTeam' when closing/opening the modal.
  useEffect(
    () =>
      setNewTeam({
        name: "",
        teamAgeType: "",
      }),
    [open]
  );

  return (
    <Modal open={open} onClose={onClose} title="Create New League">
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="start"
        flexDirection="column"
      >
        <Typography variant="body1"> Team Name</Typography>
        <Input
          label="Name"
          placeholder="League name"
          required
          value={newTeam?.name}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setNewTeam({ ...newTeam, name: evt.target.value });
          }}
        />

        <Typography variant="body1"> Team Age Group</Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Input
            label="Custom League Age"
            placeholder="League name"
            value={newTeam?.teamAgeType}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewTeam({ ...newTeam, teamAgeType: evt.target.value });
            }}
          />

          <Box mx={1} width="50%">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="league-select-label">League Age</InputLabel>
              <Select
                labelId="league-select-label"
                id="demo-simple-select"
                value={newTeam.teamAgeType}
                onChange={(evt) => {
                  setNewTeam({
                    ...newTeam,
                    teamAgeType: evt.target.value as TeamAgeType,
                  });
                }}
              >
                <MenuItem value={TeamAgeType.OPEN}>{TeamAgeType.OPEN}</MenuItem>
                <MenuItem value={TeamAgeType.SENIOR}>
                  {TeamAgeType.SENIOR}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <DialogActions>
          <Button
            disabled={!isValid}
            size="large"
            onClick={() => void onAdd(newTeam)}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
