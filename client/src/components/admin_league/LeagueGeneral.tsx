import React, {
  FunctionComponent,
  useState,
  useMemo,
  ChangeEvent,
} from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import isEqual from "lodash/isEqual";

import { League, LeagueType } from "../../types/league";
import { Input } from "../input/Input";
import { Button } from "../button/Button";

interface LeageGeneralProps {
  league: League;
  updateLeague: (updateLeague: League) => void;
}

/**
 * Show and allow update to general league info
 */
const UnstyledLeagueGeneral: FunctionComponent<LeageGeneralProps> = ({
  league: origLeague,
  updateLeague,
}) => {
  const [league, setLeague] = useState<League>(origLeague);

  const hasNoChanges = useMemo(() => {
    return isEqual(league, origLeague);
  }, [league, origLeague]);

  return (
    <Box>
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
        <Box mb={2}>
          <Typography variant="body1">League Type</Typography>
        </Box>

        <FormControl variant="outlined">
          <InputLabel id="league-select-label">Type</InputLabel>

          <Select
            labelId="league-select-label"
            id="league-select"
            value={league.leagueType}
            onChange={(evt) => {
              setLeague({
                ...league,
                leagueType: evt.target.value as LeagueType,
              });
            }}
          >
            <MenuItem value={LeagueType.INDOOR}>{LeagueType.INDOOR}</MenuItem>
            <MenuItem value={LeagueType.OUTDOOR}>{LeagueType.OUTDOOR}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider />

      <Box my={2}>
        <Typography variant="body1">League Age Group</Typography>

        <Typography variant="body2" color="error">
          *OPEN/SENIOR or custome values.
        </Typography>

        <Input
          label="Age Group"
          placeholder="Age Group"
          required
          value={league.leagueAgeType}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setLeague({ ...league, leagueAgeType: evt.target.value });
          }}
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Box>

      <Button disabled={hasNoChanges} onClick={() => updateLeague(league)}>
        Update General info
      </Button>
    </Box>
  );
};

export const LeagueGeneral = withTheme(styled(UnstyledLeagueGeneral)``);
