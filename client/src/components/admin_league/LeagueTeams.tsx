import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

import { League } from "../../types/league";

interface LeagueTeamsProps {
  league: League;
}

const UnstyledLeagueTeams: FunctionComponent<LeagueTeamsProps> = ({
  league,
}) => {
  return <Box>League Teams</Box>;
};

export const LeagueTeams = withTheme(styled(UnstyledLeagueTeams)``);
