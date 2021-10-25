import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

interface LeagueSelectProps {
  className?: string;
  title: string;
  selected: boolean;
  onClick: () => void;
}

/**
 * Main home page.
 */
const UnstyledLeagueSelect: FunctionComponent<LeagueSelectProps> = ({
  className,
  title,
  selected,
  onClick,
}) => {
  return (
    <Box
      mr={3}
      className={className}
      position="relative"
      onClick={() => onClick()}
    >
      {title}
      {selected && <Box className="hl" />}
    </Box>
  );
};

export const LeagueSelect = withTheme(styled(UnstyledLeagueSelect)`
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;

  color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.main : 'rgba(39, 69, 85, 0.3)'};
  .hl {
    height: 4px;
    position: absolute;
    left: -14%;
    width: 130%;
    top: 110%;
    background: #f17f42;
  }
`);
