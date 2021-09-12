import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

interface LeagueProps {
  className?: string;
}

/**
 * League Page.
 * NOTE: This  might be broken into submenu per season.
 */
const UnstyledLeague: FunctionComponent<LeagueProps> = ({ className }) => {
  return <Box>League page</Box>;
};

export const League = withTheme(styled(UnstyledLeague)``);
