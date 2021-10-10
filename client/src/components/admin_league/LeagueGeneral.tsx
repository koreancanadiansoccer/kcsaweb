import React, {
  FunctionComponent,
  useState,
  useMemo,
  ChangeEvent,
  useCallback,
  useContext,
} from 'react';
import { useMutation } from '@apollo/client';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';

import {
  UPDATE_LEAGUE,
  UpdateLeagueResult,
  UpdateLeagueInput,
} from '../../graphql/league/update_league.mutation';
import { parseError } from '../../graphql/client';
import { formatYear } from '../../utils/format';
import { League, leagueTypeOptions } from '../../types/league';
import { ageOptions } from '../../types/age.enum';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import { Select } from '../select/Select';
import { LeagueContext } from '../../context/league';

/**
 * Show and allow update to general league info
 */
const UnstyledLeagueGeneral: FunctionComponent = () => {
  const { league: origLeague, setLeague: setOrigLeague } = useContext(
    LeagueContext
  );

  const [league, setLeague] = useState<League>(origLeague);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [updateLeagueMutation] = useMutation<
    UpdateLeagueResult,
    UpdateLeagueInput
  >(UPDATE_LEAGUE);

  const hasNoChanges = useMemo(() => {
    return isEqual(league, origLeague);
  }, [league, origLeague]);

  /**
   * Update league
   * @param updateLeague
   */
  const updateLeague = useCallback(async () => {
    setLoading(true);

    try {
      const res = await updateLeagueMutation({
        variables: {
          league,
        },
      });

      if (res.data) {
        setOrigLeague(res.data.updateLeague);
      }
    } catch (e) {
      setError(parseError(e));
    }
  }, [league, updateLeagueMutation]);

  return (
    <Box>
      {/* League Active setting */}
      <Box>
        <Typography variant="body1">Active</Typography>

        <Typography variant="body2" color="error">
          *Make sure you disabled other leagues of same league type and age
          group before activating this league.
        </Typography>

        <Checkbox
          checked={league.isActive}
          color="primary"
          onChange={() => {
            setLeague({ ...league, isActive: !league.isActive });
          }}
        />
      </Box>

      <Divider />

      <Box my={2}>
        <Typography variant="body1"> League Basic</Typography>

        <Box display="flex">
          <Input
            label="Name"
            placeholder="League name"
            required
            value={league.name}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setLeague({ ...league, name: evt.target.value });
            }}
          />

          <Box ml={3}>
            <Input
              label="Year"
              required
              value={league?.year}
              fullWidth
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setLeague({
                  ...league,
                  year: formatYear(evt.target.value),
                });
              }}
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* AGE INPUT */}
      <Box my={2}>
        <Box mb={2}>
          <Typography variant="body1">League Age Group</Typography>
        </Box>
        <Typography variant="body2" color="error">
          *OPEN/SENIOR or custome values.
        </Typography>

        <Select
          defaultValue={find(
            ageOptions,
            (ageOption) => ageOption.value === league.leagueAgeType
          )}
          options={ageOptions}
          isClearable
          createable
          handleChange={(option: any) => {
            setLeague({ ...league, leagueAgeType: option?.value });
          }}
        />
      </Box>

      <Divider />

      {/* League type; Indoor vs Outdoor */}
      <Box my={2}>
        <Box mb={2}>
          <Typography variant="body1">League Type</Typography>
        </Box>

        <Select
          defaultValue={find(
            leagueTypeOptions,
            (leagueOption) => leagueOption.value === league.leagueType
          )}
          options={leagueTypeOptions}
          isClearable
          createable
          handleChange={(option: any) => {
            setLeague({ ...league, leagueType: option?.value });
          }}
        />
      </Box>

      <Divider />

      <Box my={2}>
        <Button disabled={hasNoChanges} onClick={updateLeague}>
          Update General info
        </Button>
      </Box>
    </Box>
  );
};

export const LeagueGeneral = withTheme(styled(UnstyledLeagueGeneral)``);
