import React, {
  FunctionComponent,
  useState,
  useMemo,
  useContext,
  ChangeEvent,
  useCallback,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { useMutation } from '@apollo/client';

import { DashboardViewerContext } from '../../context/dashboardViewer';
import { User } from '../../types/user';
import { Input } from '../input/Input';
import { Button, ErrorButton } from '../button/Button';
import { ErrorAlert } from '../alert_msg/Alerts';
import { formatPhone, unformatPhone } from '../../utils/format';
import {
  UpdateDashboardInput,
  UpdateDashboardResult,
  UPDATE_DASHBOARD,
  STEPS,
} from '../../graphql/update_dashboard.mutation';
import { parseError } from '../../graphql/client';

interface UserEdit extends User {
  password: string;
  passwordConfirm: string;
}

interface CaptainGeneralProps {
  className?: string;
}
const UnstyledCaptainGeneral: FunctionComponent<CaptainGeneralProps> = ({
  className,
}) => {
  const { dashboardViewer, setDashboardViewer } = useContext(
    DashboardViewerContext
  );

  if (!dashboardViewer.user) {
    return <Box>Could not find user</Box>;
  }

  const [error, setError] = useState('');
  const [captain, setCaptain] = useState<UserEdit>({
    ...dashboardViewer.user,
    password: '',
    passwordConfirm: '',
  });

  const [updateDashboardMut] = useMutation<
    UpdateDashboardResult,
    UpdateDashboardInput
  >(UPDATE_DASHBOARD);

  const updateUser = useCallback(async () => {
    if (!captain?.id) {
      console.error('no id');
      return;
    }
    try {
      const captainUpdate = pick(captain, [
        'id',
        'firstName',
        'lastName',
        'dob',
        'email',
        'phoneNumber',
        'password',
      ]);

      if (!dashboardViewer.user) {
        setError('Error - please refresh');
        return;
      }

      const res = await updateDashboardMut({
        variables: {
          id: dashboardViewer.user.id,
          step: STEPS.CAPTAIN,
          user: { ...captainUpdate },
        },
      });

      // If success, redirect to team edit page
      if (res.data?.updateDashboard) {
        setDashboardViewer(res.data?.updateDashboard);
      }
    } catch (e) {
      setError(parseError(e));
    }
  }, [captain, dashboardViewer]);

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [passwordEditAllow, setPasswordEditAllow] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const passwordConfrimError = useMemo(() => {
    return captain.password !== captain.passwordConfirm
      ? 'Passwords not matching'
      : '';
  }, [captain]);

  const passwordValid = useMemo(() => {
    if (!passwordEditAllow) return true;
    return (
      !!captain?.password &&
      !!captain?.passwordConfirm &&
      captain.password === captain.passwordConfirm &&
      !passwordError
    );
  }, [captain, passwordEditAllow]);

  const hasNoChanges = useMemo(
    () =>
      isEqual(
        omit(captain, ['password', 'passwordConfirm']),
        dashboardViewer.user
      ),
    [captain, dashboardViewer]
  );

  const isValid = useMemo(
    () =>
      !!captain?.firstName &&
      !!captain?.lastName &&
      !!captain?.email &&
      !emailError &&
      !!captain?.dob &&
      !!captain?.phoneNumber &&
      !phoneError &&
      passwordValid,
    [captain, passwordEditAllow]
  );

  return (
    <Box mt={4} className={className}>
      <Input
        className="create-field"
        type="text"
        label="Name:"
        value={captain.firstName}
        margin="normal"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setCaptain({
            ...captain,
            firstName: evt.target.value,
          });
        }}
      />

      <Input
        className="create-field"
        type="text"
        label="Name:"
        value={captain.lastName}
        margin="normal"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setCaptain({
            ...captain,
            lastName: evt.target.value,
          });
        }}
      />
      <Input
        className="create-field"
        label="Date of Birth"
        placeholder="date of birth"
        type="date"
        value={captain.dob}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setCaptain({ ...captain, dob: e.target.value });
        }}
      />

      <Input
        className="create-field"
        type="email"
        label="Email:"
        value={captain.email}
        error={!!emailError}
        helperText={emailError}
        margin="normal"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          const email = evt.target.value;

          setEmailError(
            !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
              ? 'Please enter valid email'
              : ''
          );

          setCaptain({
            ...captain,
            email: email.trim(),
          });
        }}
      />

      <Input
        className="create-field"
        type="text"
        label="Phone Number:"
        value={formatPhone(captain.phoneNumber)}
        margin="normal"
        error={!!phoneError}
        helperText={phoneError}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          const phone = unformatPhone(evt.target.value);

          setPhoneError(phone.length !== 10 ? 'Enter full phone number' : '');

          setCaptain({
            ...captain,
            phoneNumber: unformatPhone(phone),
          });
        }}
      />

      <Divider />

      <Box mt={3}>
        <ErrorButton
          size="large"
          variant="contained"
          onClick={() => setPasswordEditAllow(true)}
        >
          {passwordEditAllow ? 'Password Edit Enabled' : 'EDIT PASSWORD'}
        </ErrorButton>
      </Box>

      <Input
        className="create-field"
        type="password"
        label="Password:"
        disabled={!passwordEditAllow}
        value={captain.password}
        error={!!passwordError}
        helperText={passwordError}
        margin="normal"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          const pw = evt.target.value.trim();
          setPasswordError(
            pw.length < 5 ? 'Password must be at least length 5' : ''
          );
          setCaptain({
            ...captain,
            password: evt.target.value.trim(),
          });
        }}
      />

      <Input
        className="create-field"
        type="password"
        label="Confirm Password:"
        disabled={!passwordEditAllow}
        value={captain.passwordConfirm}
        error={!!passwordConfrimError}
        helperText={passwordConfrimError}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          const passwordConfirm = evt.target.value.trim();
          setCaptain({
            ...captain,
            passwordConfirm: passwordConfirm,
          });
        }}
      />
      <Divider />
      <Box mt={3}>
        <Button
          disabled={!isValid || hasNoChanges}
          size="large"
          variant="contained"
          color="primary"
          onClick={updateUser}
        >
          UPDATE
        </Button>
      </Box>

      <ErrorAlert msg={error} resetMsg={() => setError('')} />
    </Box>
  );
};

export const CaptainGeneral = withTheme(styled(UnstyledCaptainGeneral)`
  .create-form {
    padding: 20px;
    border: 2px solid rgba(142, 142, 147, 0.2);
  }

  .create-field {
    width: 30rem;
  }
  .MuiInputBase-root.Mui-disabled {
    background: gainsboro;
  }
`);
