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

import { NewCaptain } from '../../../types/user';
import { Modal } from '../../../components/modal/Modal';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/button/Button';
import { formatPhone, unformatPhone } from '../../../utils/format';

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

interface InviteNewCaptainProps extends Pick<DialogProps, 'open' | 'onClose'> {
  onSubmit: (newCaptain: NewCaptain) => Promise<void>;
}

/**
 * Modal to invite new captains.
 */
export const InviteNewCaptainModal: FunctionComponent<InviteNewCaptainProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  // Init state for new product.
  const [newCaptain, setNewCaptain] = useState<NewCaptain>({
    name: '',
    phoneNumber: '',
    email: '',
    teamName: '',
  });

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const isValid = useMemo(
    () =>
      !!newCaptain?.name &&
      !!newCaptain?.phoneNumber &&
      newCaptain?.phoneNumber.length === 10 &&
      !!newCaptain?.email &&
      EMAIL_REGEX.test(newCaptain?.email) &&
      !!newCaptain?.teamName,
    [newCaptain]
  );

  // Reset 'newLeague' when closing/opening the modal.
  useEffect(
    () =>
      setNewCaptain({
        name: '',
        phoneNumber: '',
        email: '',
        teamName: '',
      }),
    [open]
  );

  return (
    <Modal open={open} onClose={onClose} title="Invite New Captain">
      <Box>
        <Typography variant="body1">Captain Name</Typography>

        <Input
          label="Captain Name"
          placeholder="Captain Name"
          required
          value={newCaptain?.name}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setNewCaptain({ ...newCaptain, name: evt.target.value });
          }}
        />
      </Box>

      <Divider />

      <Box mt={2}>
        <Typography variant="body1">Team Name</Typography>

        <Input
          label="Team Name"
          placeholder="Team Name"
          required
          value={newCaptain?.teamName}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setNewCaptain({ ...newCaptain, teamName: evt.target.value });
          }}
        />
      </Box>

      <Divider />

      <Box mt={2}>
        <Typography variant="body1">Email</Typography>

        <Input
          label="Email"
          placeholder="Email"
          error={!!emailError}
          helperText={emailError}
          required
          value={newCaptain?.email}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            const email = evt.target.value;

            setEmailError(
              !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
                ? 'Please enter valid email'
                : ''
            );

            setNewCaptain({ ...newCaptain, email: email.trim() });
          }}
        />
      </Box>

      <Divider />

      <Box mt={2}>
        <Typography variant="body1">Phone Number</Typography>

        <Input
          label="Phone"
          placeholder="Phone Number"
          required
          error={!!phoneError}
          helperText={phoneError}
          value={formatPhone(newCaptain?.phoneNumber || '')}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            const phone = unformatPhone(evt.target.value);

            setPhoneError(phone.length !== 10 ? 'Enter full phone number' : '');
            setNewCaptain({
              ...newCaptain,
              phoneNumber: unformatPhone(evt.target.value),
            });
          }}
        />
      </Box>

      <Divider />

      <DialogActions>
        <Button
          disabled={!isValid}
          size="large"
          onClick={(evt) => {
            evt.preventDefault();
            void onSubmit(newCaptain);
          }}
        >
          Invite (Sends email)
        </Button>
      </DialogActions>
    </Modal>
  );
};
