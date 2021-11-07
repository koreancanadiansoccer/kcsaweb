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

import { Modal } from '../../../modal/Modal';
import { Input } from '../../../input/Input';
import { Button } from '../../../button/Button';
import { PlayerInput } from '../../../../types/player';

interface CreatePlayerModalProps extends Pick<DialogProps, 'open' | 'onClose'> {
  onAdd: (newPlayer: PlayerInput) => Promise<void>;
  selectedPlayer: PlayerInput;
}

/**
 * Modal to handle player update - Captain side.
 */
export const UpdatePlayerModal: FunctionComponent<CreatePlayerModalProps> = ({
  open,
  onClose,
  onAdd,
  selectedPlayer,
}) => {
  // Init state for new product.
  const [updatePlayer, setUpdatePlayer] = useState<PlayerInput>({
    id: selectedPlayer.id,
    firstName: selectedPlayer.firstName,
    lastName: selectedPlayer.lastName,
    dob: selectedPlayer.dob,
  });

  const isValid = useMemo(
    () =>
      !!updatePlayer?.firstName &&
      !!updatePlayer?.lastName &&
      !!updatePlayer.dob,
    [updatePlayer]
  );

  // Reset 'updatePlayer' when closing/opening the modal.
  useEffect(
    () =>
      setUpdatePlayer({
        id: selectedPlayer.id,
        firstName: selectedPlayer.firstName,
        lastName: selectedPlayer.lastName,
        dob: selectedPlayer.dob,
      }),
    [open]
  );

  return (
    <Modal open={open} onClose={onClose} title="Create New Player">
      <Box>
        <Box my={2}>
          <Typography variant="body1">Update Player</Typography>
          <Input
            label="First Name"
            placeholder="Player name"
            required
            value={updatePlayer.firstName}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setUpdatePlayer({ ...updatePlayer, firstName: evt.target.value });
            }}
          />
        </Box>

        <Box my={2}>
          <Input
            label="Last Name"
            placeholder="Player name"
            required
            value={updatePlayer.lastName}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setUpdatePlayer({ ...updatePlayer, lastName: evt.target.value });
            }}
          />
        </Box>

        <Divider />

        <Box my={2}>
          <Input
            label="DOB"
            value={updatePlayer?.dob}
            placeholder="date of birth"
            type="date"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUpdatePlayer({ ...updatePlayer, dob: e.target.value });
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Divider />

        <DialogActions>
          <Button
            disabled={!isValid}
            size="large"
            onClick={() => void onAdd(updatePlayer)}
          >
            Update
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
