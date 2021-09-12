import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

interface TeamProps {
  className?: string;
}

/**
 * Team Page.
 * NOTE: This  might be broken into submenu per season.
 */
const UnstyledTeam: FunctionComponent<TeamProps> = ({ className }) => {
  return <Box>Team page</Box>;
};

export const Team = withTheme(styled(UnstyledTeam)``);
