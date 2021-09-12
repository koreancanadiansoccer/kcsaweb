import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

interface AboutOverviewProps {
  className?: string;
}

/**
 * About Page.
 */
export const UnstyledAboutOverview: FunctionComponent<AboutOverviewProps> = ({
  className,
}) => {
  return <Box>Overview page</Box>;
};

export const AboutOverview = withTheme(styled(UnstyledAboutOverview)``);
