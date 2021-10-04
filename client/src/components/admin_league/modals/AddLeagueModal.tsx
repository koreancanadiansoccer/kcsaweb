import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import { Modal } from '../../modal/Modal';
import { Input } from '../../input/Input';
import { Button } from '../../button/Button';
import { LeagueInput, LeagueAgeType, LeagueType } from '../../../types/league';

interface AddLeagueModalProp extends Pick<DialogProps, 'open' | 'onClose'> {
  onAdd: (league: LeagueInput) => Promise<void>;
}

/**
 * Modal to handle league creation.
 */
export const AddLeagueModal: FunctionComponent<AddLeagueModalProp> = ({
  open,
  onClose,
  onAdd,
}) => {
  // Init state for new product.
  const [newLeague, setNewLeague] = useState<LeagueInput>({
    name: '',
    leagueAgeType: '',
    leagueType: '',
    maxYellowCard: 0,
  });

  const isValid = useMemo(
    () =>
      !!newLeague?.name &&
      !!newLeague?.leagueType &&
      !!newLeague?.leagueAgeType &&
      !!newLeague?.maxYellowCard,
    [newLeague]
  );

  // Reset 'newLeague' when closing/opening the modal.
  useEffect(
    () =>
      setNewLeague({
        name: '',
        leagueAgeType: '',
        leagueType: '',
        maxYellowCard: 0,
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
        <Typography variant="body1"> League Name</Typography>
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

        <Typography variant="body1"> League Age Group</Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Input
            label="Custom League Age"
            placeholder="League name"
            value={newLeague?.leagueAgeType}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewLeague({ ...newLeague, leagueAgeType: evt.target.value });
            }}
          />

          <Box mx={1} width="50%">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="league-select-label">League Age</InputLabel>
              <Select
                labelId="league-select-label"
                id="demo-simple-select"
                value={newLeague.leagueAgeType}
                onChange={(evt) => {
                  setNewLeague({
                    ...newLeague,
                    leagueAgeType: evt.target.value as LeagueAgeType,
                  });
                }}
              >
                <MenuItem value={LeagueAgeType.OPEN}>
                  {LeagueAgeType.OPEN}
                </MenuItem>
                <MenuItem value={LeagueAgeType.SENIOR}>
                  {LeagueAgeType.SENIOR}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box my={3}>
          <Typography variant="body1">League Type</Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="league-select-label">Type</InputLabel>
            <Select
              labelId="league-select-label"
              id="demo-simple-select"
              value={newLeague.leagueType}
              onChange={(evt) => {
                setNewLeague({
                  ...newLeague,
                  leagueType: evt.target.value as LeagueType,
                });
              }}
            >
              <MenuItem value={LeagueType.INDOOR}>{LeagueType.INDOOR}</MenuItem>
              <MenuItem value={LeagueType.OUTDOOR}>
                {LeagueType.OUTDOOR}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="body1">
            Accumulated Yellow card for suspension
          </Typography>

          <Input
            label="Max YellowCard"
            placeholder="Yellowcard"
            required
            value={newLeague?.maxYellowCard}
            type="number"
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewLeague({
                ...newLeague,
                maxYellowCard: parseInt(evt.target.value, 10),
              });
            }}
          />
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
