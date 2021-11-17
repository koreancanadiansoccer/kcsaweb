import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useMutation } from '@apollo/client';

import { Modal } from '../../../components/modal/Modal';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/button/Button';
import { SuccessAlert } from '../../../components/alert_msg/Alerts';
import { User, EMAIL_REGEX } from '../../../types/user';
import { formatPhone, unformatPhone } from '../../../utils/format';
import {
  UPDATE_CAPTAIN,
  UpdateCaptainResult,
  UpdateCaptainInput,
} from '../../../graphql/users/update_captain';
import {
  SEND_EMAIL,
  SendEmailResult,
  SendEmailInput,
} from '../../../graphql/send_email';
import { ageOptions } from '../../../types/age.enum';
import { Select } from '../../../components/select/Select';

export interface UpdateCaptainModalProps
  extends Pick<DialogProps, 'open' | 'onClose'> {
  selectedCaptain: User;
  setUsers: (newUser: User[]) => void;
}

/**
 * Modal to update / resend invite
 */
export const UpdateCaptainModal: FunctionComponent<UpdateCaptainModalProps> = ({
  open,
  onClose,
  selectedCaptain,
  setUsers,
}) => {
  const [captain, setCaptain] = useState<User>(selectedCaptain);

  const [sucess, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [updateCaptain] = useMutation<UpdateCaptainResult, UpdateCaptainInput>(
    UPDATE_CAPTAIN
  );

  const [sendEmail] = useMutation<SendEmailResult, SendEmailInput>(SEND_EMAIL);

  const update = useCallback(async () => {
    try {
      const res = await updateCaptain({
        variables: {
          ...captain,
          teamName: captain.team.name,
          teamAgeType: captain.team.teamAgeType,
        },
      });

      if (res.data?.updateCaptain) {
        setUsers(res.data?.updateCaptain);
        setSuccess('Update Complete');
      }
    } catch (e) {
      console.error(e);
    }
  }, [captain]);

  const resend = useCallback(async () => {
    try {
      const res = await sendEmail({
        variables: { emails: [captain.email] },
      });

      if (res.data?.sendEmail) {
        // Set success message
        setSuccess('Email sent');
      }
    } catch (e) {
      console.error(e);
    }
  }, [captain]);

  const isValid = useMemo(
    () =>
      !!captain?.firstName &&
      !!captain?.lastName &&
      !!captain?.phoneNumber &&
      captain?.phoneNumber.length === 10 &&
      !!captain?.email &&
      EMAIL_REGEX.test(captain?.email) &&
      !!captain?.team?.name,
    [captain]
  );

  const hasNoChanges = useMemo(() => {
    return isEqual(captain, selectedCaptain);
  }, [captain, selectedCaptain]);

  // Reset 'captain' when closing/opening the modal.
  useEffect(() => setCaptain(selectedCaptain), [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Update Captain: ${selectedCaptain.firstName} ${selectedCaptain.lastName}`}
    >
      <Box>
        <Typography variant="body1">Captain Name</Typography>

        <Input
          label="First Name"
          placeholder="First Name"
          required
          value={captain?.firstName}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setCaptain({ ...captain, firstName: evt.target.value });
          }}
        />

        <Box>
          <Input
            label="Last Name"
            placeholder="Last Name"
            required
            value={captain?.lastName}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setCaptain({ ...captain, lastName: evt.target.value });
            }}
          />
        </Box>

        <Box>
          <Typography variant="body1">Date of Birth</Typography>

          <Input
            label="Date of Birth"
            placeholder="Date of birth"
            type="date"
            helperText="You can leave this blank - Captains will be requried to put in during registration"
            required
            value={captain?.dob}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setCaptain({ ...captain, dob: evt.target.value });
            }}
          />
        </Box>

        <Divider />

        <Box mt={2}>
          <Typography variant="body1">Club Name</Typography>

          <Input
            label="Club Name"
            placeholder="Club Name"
            required
            value={captain?.team?.name}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const team = { ...captain.team, name: evt.target.value };
              setCaptain({ ...captain, team: team });
            }}
          />
        </Box>

        <Divider />

        <Box my={2}>
          <Typography variant="body1"> Club Age Group</Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            my={2}
          >
            <Box width="50%">
              <Select
                defaultValue={find(
                  ageOptions,
                  (ageOption) => ageOption.value === captain.team.teamAgeType
                )}
                options={ageOptions}
                isClearable
                createable
                handleChange={(option: any) => {
                  const team = {
                    ...captain.team,
                    teamAgeType: option?.value,
                  };
                  setCaptain({ ...captain, team: team });
                }}
              />
            </Box>
          </Box>
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
            value={captain?.email}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const email = evt.target.value;

              setEmailError(
                !EMAIL_REGEX.test(email) ? 'Please enter valid email' : ''
              );

              setCaptain({ ...captain, email: email.trim() });
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
            value={formatPhone(captain?.phoneNumber || '')}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const phone = unformatPhone(evt.target.value);

              setPhoneError(
                phone.length !== 10 ? 'Enter full phone number' : ''
              );
              setCaptain({
                ...captain,
                phoneNumber: unformatPhone(evt.target.value),
              });
            }}
          />
        </Box>
      </Box>

      <DialogActions>
        <Button
          disabled={!hasNoChanges}
          size="large"
          onClick={(evt) => {
            evt.preventDefault();
            void resend();
          }}
        >
          {hasNoChanges
            ? 'Resend Invitation Email'
            : 'Finish update to resend Invitation'}
        </Button>

        <Button
          disabled={!isValid || hasNoChanges}
          size="large"
          onClick={(evt) => {
            evt.preventDefault();
            void update();
          }}
        >
          Update
        </Button>
      </DialogActions>
      <SuccessAlert msg={sucess} resetMsg={() => setSuccess('')} />
    </Modal>
  );
};
