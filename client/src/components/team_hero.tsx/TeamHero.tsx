import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import LogoGrey from "../../assets/logo_grey.svg";

interface TeamHeroProps {
  className?: string;
  teamColor?: string;
  name?: string;
  captain?: string;
  foundedDate?: string;
  mission?: string;
}

/**
 * Team Hero
 */
const UnstyledTeamHero: FunctionComponent<TeamHeroProps> = ({
  className,
  name,
  captain,
  foundedDate,
  mission,
}) => {
  return (
    <Box className={className}>
      {/* Teams - hero */}
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Logo */}
        <Box minWidth={326} minHeight={341}>
          <img src={LogoGrey} alt="hero-main" className="hero-main" />
        </Box>

        {/* Team meta data */}
        <Box ml={9} maxWidth={600}>
          <Typography variant="h3" className="boldText">
            {name}
          </Typography>

          <Box mt={9}>
            <Typography variant="h6" className="boldText">
              Team Officials: {captain}
            </Typography>
          </Box>

          <Box mt={1}>
            <Typography variant="h6" className="boldText">
              Team Founded Date:{foundedDate}
            </Typography>
          </Box>

          <Box mt={1}>
            <Typography variant="h6" className="boldText">
              Team's mission & Vision: {mission}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const TeamHero = withTheme(styled(UnstyledTeamHero)`
  height: 600px; /*or 70%, or what you want*/
  background: ${({ teamColor }) =>
    `linear-gradient(90deg, ${teamColor} 0%, rgba(6, 6, 6, 1) 60%, black 81%);`};
  color: white;
`);
