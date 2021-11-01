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
import dayjs from 'dayjs';

import { Modal } from '../../../../components/modal/Modal';
import { Input } from '../../../../components/input/Input';
import { Button } from '../../../../components/button/Button';
import { PlayerInput } from '../../../../types/player';

interface CreateTeamPlayerModal extends Pick<DialogProps, 'open' | 'onClose'> {
  onAdd: (newPlayer: PlayerInput) => Promise<void>;
}

/**
 * Modal to handle player creation.
 */
export const CreateTeamPlayerModal: FunctionComponent<CreateTeamPlayerModal> = ({
  open,
  onClose,
  onAdd,
}) => {
  // Init state for new product.
  const [newPlayer, setNewPlayer] = useState<PlayerInput>({
    firstName: '',
    lastName: '',
    dob: dayjs().subtract(18, 'year').format('YYYY-MM-DD'),
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
        dob: dayjs().subtract(18, 'year').format('YYYY-MM-DD'),
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
          <Input
            label="DOB"
            value={newPlayer?.dob}
            placeholder="date of birth"
            type="date"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNewPlayer({ ...newPlayer, dob: e.target.value });
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
            onClick={() => void onAdd(newPlayer)}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
