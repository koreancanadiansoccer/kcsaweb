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

import { Modal } from '../modal/Modal';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { PlayerInput } from '../../types/player';

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
    name: '',
  });

  const isValid = useMemo(() => !!newPlayer?.name, [newPlayer]);

  // Reset 'newPlayer' when closing/opening the modal.
  useEffect(
    () =>
      setNewPlayer({
        name: '',
      }),
    [open]
  );

  return (
    <Modal open={open} onClose={onClose} title="Create New Club">
      <Box>
        <Box my={2}>
          <Typography variant="body1">Add Player</Typography>
          <Input
            label="Name"
            placeholder="Player name"
            required
            value={newPlayer.name}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewPlayer({ ...newPlayer, name: evt.target.value });
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
