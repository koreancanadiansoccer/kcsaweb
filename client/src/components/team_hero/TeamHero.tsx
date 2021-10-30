import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import dayjs from 'dayjs';

import LogoGrey from '../../assets/logo_grey.svg';

interface TeamHeroProps {
  className?: string;
  teamColor?: string;
  name?: string;
  captain?: string;
  foundedDate?: string;
  teamLogo?: string;
}

/**
 * Team Hero
 */
const UnstyledTeamHero: FunctionComponent<TeamHeroProps> = ({
  className,
  name,
  captain,
  foundedDate,
  teamLogo,
  children,
}) => {
  return (
    <Box className={className}>
      {/* Teams - hero */}
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt={10}
      >
        {/* Logo */}
        <Box minWidth={326} minHeight={341}>
          <img
            src={teamLogo ? teamLogo : LogoGrey}
            alt="hero-main"
            className="hero-main"
          />
        </Box>

        {/* Team meta data */}
        <Box ml={9} maxWidth={600}>
          <Typography variant="h3" className="boldText">
            {name}
          </Typography>

          <Box mt={9}>
            <Typography variant="h6" className="boldText">
              Club Officials: {captain}
            </Typography>
          </Box>

          <Box mt={1}>
            <Typography variant="h6" className="boldText">
              Founded Date:{' '}
              {foundedDate
                ? dayjs(foundedDate, 'YYYY-MM').format('MMMM, YYYY')
                : ' - '}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box pb={20}>{children}</Box>
    </Box>
  );
};

export const TeamHero = withTheme(styled(UnstyledTeamHero)`
  height: 100%; /*or 70%, or what you want*/
  background: ${({ teamColor }) =>
    `linear-gradient(90deg, ${teamColor} 0%, rgba(6, 6, 6, 1) 60%, black 81%);`};
  color: white;
`);
