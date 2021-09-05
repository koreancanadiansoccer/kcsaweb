import React, { FunctionComponent } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withTheme } from "@material-ui/core";
import styled from "styled-components";

interface HeaderRowProps {
  className: string;
}

/**
 * header rows.
 * Display fixed header texts.
 */
const UnstyledHeaderRow: FunctionComponent<HeaderRowProps> = ({
  className,
}) => (
  <Box
    display="flex"
    justifyContent="space-evenly"
    alignItems="center"
    textAlign="left"
    borderColor="grey.500"
    border={3}
    borderTop={0}
    borderLeft={0}
    borderRight={0}
    py={1}
    className={className}
  >
    <Box flex={1} ml={3}>
      <Typography>Pos</Typography>
    </Box>

    <Box flex={1}>
      <Typography>Club</Typography>
    </Box>

    <Box flex={1}>
      <Typography>PL</Typography>
    </Box>

    <Box flex={1}>
      <Typography>GD</Typography>
    </Box>

    <Box flex={1}>
      <Typography>PTs</Typography>
    </Box>
  </Box>
);

export const HeaderRow = withTheme(styled(UnstyledHeaderRow)`
  background-color: ${({ theme }) => theme.palette.grey[200]};
`);
