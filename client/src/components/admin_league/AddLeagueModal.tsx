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

import { LeagueInput, LeagueType } from "../../types/league";

interface AddLeagueModalProp extends Pick<DialogProps, "open" | "onClose"> {
  onAdd: (league: LeagueInput) => Promise<void>;
}

/**
 * Modal to handle league addition.
 */
export const AddLeagueModal: FunctionComponent<AddLeagueModalProp> = ({
  open,
  onClose,
  onAdd,
}) => {
  // Init state for new product.
  const [newLeague, setNewLeague] = useState<LeagueInput>({
    name: "",
    leagueType: "",
  });

  const isValid = useMemo(() => !!newLeague?.name && !!newLeague?.leagueType, [
    newLeague,
  ]);

  // Reset 'newLeague' when closing/opening the modal.
  useEffect(
    () =>
      setNewLeague({
        name: "",
        leagueType: "",
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
        width="80%"
      >
        <Input
          label="Name"
          placeholder="League name"
          required
          value={newLeague?.name}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setNewLeague({ ...newLeague, name: evt.target.value });
          }}
        />

        <Box width="30%" mx={1}>
          <FormControl fullWidth>
            <InputLabel id="league-select-label">League Group</InputLabel>
            <Select
              labelId="league-select-label"
              id="demo-simple-select"
              value={newLeague.leagueType}
              variant="standard"
              onChange={(evt) => {
                setNewLeague({
                  ...newLeague,
                  leagueType: evt.target.value as LeagueType,
                });
              }}
            >
              <MenuItem value={LeagueType.OPEN}>{LeagueType.OPEN}</MenuItem>
              <MenuItem value={LeagueType.SENIOR}>{LeagueType.SENIOR}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <DialogActions>
          <Button
            disabled={!isValid}
            size="large"
            onClick={() => void onAdd(newLeague)}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
