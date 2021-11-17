import React, {
  FunctionComponent,
  useState,
  useCallback,
  useMemo,
  useContext,
  ChangeEvent,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import map from 'lodash/map';
import every from 'lodash/every';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Button, ErrorButton } from '../button/Button';
import { Input } from '../input/Input';
import {
  RegisterTeamInput,
  RegisterTeamResult,
  REGISTER_TEAM,
} from '../../graphql/users/register_team.mutation';
import { parseError } from '../../graphql/client';
import { ViewerContext } from '../../context/homeViewer';
import { PlayerInput } from '../../types/player';
import { ErrorAlert } from '../alert_msg/Alerts';

interface TeamConfigProps {
  handleBack: () => void;
}

/**
 * Register team for first time.
 */
const UnstyledPlayerConfig: FunctionComponent<TeamConfigProps> = ({
  handleBack,
}) => {
  const { viewer, setViewer } = useContext(ViewerContext);
  const history = useHistory();

  // Init state for new product.
  const [players, setPlayers] = useState<PlayerInput[]>(
    viewer.user?.team.players && viewer.user?.team.players.length > 0
      ? viewer.user?.team.players
      : [
          {
            firstName: '',
            lastName: '',
            dob: null,
          },
        ]
  );

  if (!viewer.user?.team) {
    history.replace({ pathname: '/' });
    return <Box>No Team Found</Box>;
  }
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = useMemo(() => {
    if (!players || players.length === 0) return false;
    if (!players || players.length > 0) {
      const valid = every(
        players,
        (player) => !!player.firstName && !!player.lastName && !!player.dob
      );
      return valid;
    }

    return true;
  }, [players]);

  const [registerTeamMut] = useMutation<RegisterTeamResult, RegisterTeamInput>(
    REGISTER_TEAM
  );

  const registerTeam = useCallback(async () => {
    try {
      const res = await registerTeamMut({
        variables: {
          players: players,
          step: 'PLAYERS',
        },
      });

      // Registation complete - redirect to team dashboard.
      if (res.data?.registerTeam) {
        setViewer({ ...viewer, user: res.data.registerTeam });
        history.replace({ pathname: '/dashboard' });
      }
    } catch (e) {
      setErrorMsg(parseError(e));
    }
  }, [registerTeamMut, players]);

  return (
    <Box>
      <Typography variant="body1" color="error">
        *Minimum one player registration is requried.
        <br />
        You can add/edit more players later.
      </Typography>

      {map(players, (player, idx) => (
        <Box key={`$player-add-${idx}`} my={1}>
          <Divider />
          <Box mt={1}>
            <Typography variant="body1">{`Player #${idx + 1}`}</Typography>
          </Box>

          <Box mb={2} display="flex" justifyContent="start" alignItems="center">
            <Box flex={1}>
              <Box display="flex">
                <Input
                  label="First Name"
                  placeholder="Player name"
                  required
                  value={player.firstName}
                  fullWidth
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    const newPlayers = [...players];
                    newPlayers[idx] = {
                      ...newPlayers[idx],
                      firstName: evt.target.value,
                    };

                    setPlayers(newPlayers);
                  }}
                />

                <Input
                  label="Last Name"
                  placeholder="Player name"
                  required
                  value={player.lastName}
                  fullWidth
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    const newPlayers = [...players];
                    newPlayers[idx] = {
                      ...newPlayers[idx],
                      lastName: evt.target.value,
                    };

                    setPlayers(newPlayers);
                  }}
                />
              </Box>

              <Box mt={1}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    openTo={'year'}
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="DOB"
                    format="MM/dd/yyyy"
                    placeholder="mm/dd/yyyy"
                    error={!player?.dob}
                    value={player.dob}
                    InputAdornmentProps={{ position: 'start' }}
                    onChange={(date) => {
                      // setDobError(false);
                      // const valueParsed = value?.replace('_', '');
                      // if (valueParsed?.length !== 10) {
                      //   setDobError(true);
                      // }
                      const newPlayers = [...players];
                      newPlayers[idx] = {
                        ...newPlayers[idx],
                        dob: date,
                      };

                      setPlayers(newPlayers);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
            </Box>

            <Box>
              <ErrorButton
                size="large"
                onClick={() => {
                  const newPlayers = [...players];
                  newPlayers.splice(idx, 1);
                  setPlayers(newPlayers);
                }}
                color="secondary"
              >
                Remove
              </ErrorButton>
            </Box>
          </Box>
          <Divider />
        </Box>
      ))}

      {/* Add more players */}
      <Box my={2}>
        <Button
          onClick={() => {
            const newPlayers = [
              ...players,
              { firstName: '', lastName: '', dob: null },
            ];
            setPlayers(newPlayers);
          }}
        >
          Add More Players
        </Button>
      </Box>
      <Divider />

      <Box my={2} display="flex">
        <Button
          onClick={handleBack}
          color="secondary"
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
        <Box ml={1}>
          <Button disabled={!isValid} onClick={registerTeam} color="secondary">
            Finish Team Registration.
          </Button>
        </Box>
      </Box>
      <ErrorAlert msg={errorMsg} resetMsg={() => setErrorMsg('')} />
    </Box>
  );
};

export const PlayerConfig = withTheme(styled(UnstyledPlayerConfig)``);
