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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Modal } from '../../../modal/Modal';
import { Input } from '../../../input/Input';
import { Button } from '../../../button/Button';
import { PlayerInput } from '../../../../types/player';

interface CreatePlayerModalProps extends Pick<DialogProps, 'open' | 'onClose'> {
  onAdd: (newPlayer: PlayerInput) => Promise<void>;
}

/**
 * Modal to handle player creation - Captain side.
 */
export const CreatePlayerModal: FunctionComponent<CreatePlayerModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  // Init state for new product.
  const [newPlayer, setNewPlayer] = useState<PlayerInput>({
    firstName: '',
    lastName: '',
    dob: null,
  });

  const isValid = useMemo(
    () => !!newPlayer?.firstName && !!newPlayer?.lastName && !!newPlayer.dob,
    [newPlayer]
  );

  // Reset 'newPlayer' when closing/opening the modal.
  useEffect(
    () =>
      setNewPlayer({
        firstName: '',
        lastName: '',
        dob: null,
      }),
    [open]
  );

  return (
    <Modal open={open} onClose={onClose} title="Create New Player">
      <Box>
        <Box my={2}>
          <Typography variant="body1">Add Player</Typography>
          <Input
            label="First Name"
            placeholder="Player name"
            required
            value={newPlayer.firstName}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewPlayer({ ...newPlayer, firstName: evt.target.value });
            }}
          />
        </Box>

        <Box my={2}>
          <Input
            label="Last Name"
            placeholder="Player name"
            required
            value={newPlayer.lastName}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewPlayer({ ...newPlayer, lastName: evt.target.value });
            }}
          />
        </Box>

        <Divider />

        <Box my={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              openTo={'year'}
              autoOk
              variant="inline"
              inputVariant="outlined"
              label="DOB"
              format="MM/dd/yyyy"
              placeholder="mm/dd/yyyy"
              error={!newPlayer?.dob}
              value={newPlayer.dob}
              InputAdornmentProps={{ position: 'start' }}
              onChange={(date) => {
                setNewPlayer({ ...newPlayer, dob: date });
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>

        <Divider />

        <DialogActions>
          <Button
            disabled={!isValid}
            size="large"
            onClick={() => void onAdd(newPlayer)}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
