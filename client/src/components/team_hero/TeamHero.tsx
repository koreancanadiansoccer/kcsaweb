import React, { FunctionComponent } from 'react';
import { withTheme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import dayjs from 'dayjs';

import LogoGrey from '../../assets/logo_grey.svg';
import { User } from '../../types/user';

interface TeamHeroProps {
  className?: string;
  teamColor?: string;
  name?: string;
  captain?: User;
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Box className={className}>
        {/* Teams - hero */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          pt={5}
        >
          {/* Logo */}
          <Box width={200} maxHeight={341}>
            <img
              src={teamLogo ? teamLogo : LogoGrey}
              alt="hero-main"
              className="hero-main"
            />
          </Box>

          {/* Team meta data */}
          <Box textAlign="center">
            <Typography variant="h4" className="boldText">
              {name}
            </Typography>

            <Box mt={9}>
              <Typography variant="h6" className="boldText">
                Club Officials:{' '}
                {`${captain?.firstName} ${captain?.lastName}`.toUpperCase()}
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
  }
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
        <Box width={326} height={341}>
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
              Club Officials:{' '}
              {`${captain?.firstName} ${captain?.lastName}`.toUpperCase()}
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
  min-height: 81vh;
  background: ${({ teamColor }) =>
    `linear-gradient(90deg, ${teamColor} 0%, rgba(6, 6, 6, 1) 60%, black 81%);`};
  color: white;
`);
