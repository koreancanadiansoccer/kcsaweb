import React, {
  FunctionComponent,
  useState,
  useMemo,
  ChangeEvent,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';

import { Modal } from '../../modal/Modal';
import { Button } from '../../button/Button';
import { Input } from '../../input/Input';
import { Select } from '../../select/Select';
import { League } from '../../../types/league';
import { MatchInput } from '../../../types/match';
import {
  CREATE_MATCH,
  CreateMatchInput,
  CreateMatchResult,
} from '../../../graphql/match/createMatch';
import { parseError } from '../../../graphql/client';
import { LeagueContext } from '../../../context/league';

export const AddMatchModal: FunctionComponent<Pick<
  DialogProps,
  'open' | 'onClose'
>> = ({ open, onClose }) => {
  const { league: origLeague, setLeague: setOrigLeague } = useContext(
    LeagueContext
  );

  const [newMatch, setNewMatch] = useState<MatchInput>({
    matchDay: undefined,
    date: dayjs().format('YYYY-MM-DDTHH:mm'),
    location: '',
    homeTeamId: undefined,
    awayTeamId: undefined,
  });

  const isValid = useMemo(
    () =>
      !!newMatch?.matchDay &&
      !!newMatch?.date &&
      !!newMatch?.location &&
      !!newMatch?.homeTeamId &&
      !!newMatch?.awayTeamId,
    [newMatch]
  );

  // Reset 'newLeague' when closing/opening the modal.
  useEffect(
    () =>
      setNewMatch({
        matchDay: undefined,
        date: dayjs().format('YYYY-MM-DDTHH:mm'),
        location: '',
        homeTeamId: undefined,
        awayTeamId: undefined,
      }),
    [open]
  );

  const [createMatchMut] = useMutation<CreateMatchResult, CreateMatchInput>(
    CREATE_MATCH
  );

  const createMatch = useCallback(async () => {
    try {
      const res = await createMatchMut({
        variables: {
          ...newMatch,
          leagueId: origLeague.id,
        },
      });

      if (res.data?.createMatch) {
        const origLeagueMatches = [...origLeague.matches];
        origLeagueMatches.push(res.data.createMatch);

        setOrigLeague({ ...origLeague, matches: origLeagueMatches });
        if (onClose) {
          onClose({}, 'backdropClick');
        }
      }
    } catch (e) {
      console.error(parseError(e));
    }
  }, [newMatch, origLeague]);

  // Generate option list for league Teams.
  const leagueTeamOptions = useMemo(() => {
    return map(origLeague.leagueTeams, (leagueTeam) => ({
      label: leagueTeam.name,
      value: leagueTeam.id.toString(),
    }));
  }, [origLeague]);

  return (
    <Modal open={open} onClose={onClose} title="Create a Match">
      {/* Match Day */}
      <Box my={2}>
        <Typography variant="body1" className="boldText">
          Match Day #
        </Typography>

        <Input
          label="Match Day #"
          placeholder="Match Day #"
          required
          value={newMatch?.matchDay}
          type="number"
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setNewMatch({
              ...newMatch,
              matchDay: parseInt(evt.target.value, 10),
            });
          }}
        />
      </Box>
      <Divider />

      {/* Match Location */}
      <Box my={2}>
        <Typography variant="body1">Match Location</Typography>

        <Input
          label="Match Location"
          placeholder="Match Location"
          required
          value={newMatch?.location}
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setNewMatch({ ...newMatch, location: evt.target.value });
          }}
        />
      </Box>
      <Divider />

      {/* Match Time */}
      <Box my={2}>
        <Typography variant="body1">Match Time</Typography>

        <Input
          id="datetime-local"
          label="Match Time"
          value={newMatch?.date}
          type="datetime-local"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewMatch({ ...newMatch, date: e.target.value });
          }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: '600',
            min: '07:00',
            max: '23:00',
          }}
        />
      </Box>
      <Divider />

      {/* Set Home team id */}
      <Box width="100%" my={2}>
        <Typography variant="body1">HomeTeam</Typography>

        <Select
          options={leagueTeamOptions}
          handleChange={(option: any) => {
            setNewMatch({ ...newMatch, homeTeamId: parseInt(option.value) });
          }}
        />
      </Box>
      <Divider />

      {/* Set Away team id */}
      <Box width="100%" my={2}>
        <Typography variant="body1">AwayTeam</Typography>

        <Select
          options={leagueTeamOptions}
          handleChange={(option: any) => {
            setNewMatch({ ...newMatch, awayTeamId: parseInt(option.value) });
          }}
        />
      </Box>
      <Divider />

      <DialogActions>
        <Button disabled={!isValid} size="large" onClick={() => createMatch()}>
          Create
        </Button>
      </DialogActions>
    </Modal>
  );
};
