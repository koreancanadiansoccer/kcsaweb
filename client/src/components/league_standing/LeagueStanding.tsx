import React, { FunctionComponent, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import omit from 'lodash/omit';

import LogoGrey from '../../assets/logo_grey.svg';
import { LeagueTeam } from '../../types/team';
import { StandingTable } from '../standing_table/StandingTable';
import {
  LeaguePageStandingHeader,
  LeaguePageMobileStandingHeader,
} from '../standing_table/standingData';

interface LeagueStandingProps {
  className?: string;
  teams: LeagueTeam[] | null;
  isMobile: boolean;
}

/**
 * Generate League standings data.
 */
const generateStandingData = (leagueTeams: LeagueTeam[], isMobile: boolean) => {
  const history = useHistory();
  const orderData = orderBy(
    map(leagueTeams, (leagueTeam) => {
      return {
        club: (
          <Box
            className="league-standing-team-logo"
            onClick={() => history.push(`/teams/${leagueTeam.id}`)}
            pl={isMobile ? 2 : 18}
          >
            <img
              src={leagueTeam.team.teamLogoURL || LogoGrey}
              alt="league-tab-standing"
            />
            <div>{leagueTeam.team.name.toUpperCase()}</div>
          </Box>
        ),
        Played: leagueTeam.played,
        Won: leagueTeam.win,
        Drawn: leagueTeam.tie,
        Lost: leagueTeam.loss,
        Point: leagueTeam.win * 3 + leagueTeam.tie,
      };
    }),
    ['Point', 'Won', 'Drawn'],
    ['desc', 'desc', 'desc']
  );

  if (isMobile) {
    return map(orderData, (data, idx) => ({
      Position: idx + 1,
      ...omit(data, ['Won', 'Drawn', 'Lost']),
    }));
  }

  return map(orderData, (data, idx) => ({ Position: idx + 1, ...data }));
};

/**
 * League page standings table
 */
const UnstyledLeagueStanding: FunctionComponent<LeagueStandingProps> = ({
  className,
  teams,
  isMobile,
}) => {
  const leagueStandingData = useMemo(() => {
    if (!teams) return null;
    return generateStandingData(teams, isMobile);
  }, [teams, isMobile]);

  return (
    <Box className={className} mt={10}>
      <Box className="tab-banner-box" mb={4}>
        <Typography className="tab-banner-text" variant="h4">
          Standing
        </Typography>
      </Box>

      <StandingTable
        tableRowData={leagueStandingData}
        tableHeaderData={
          isMobile ? LeaguePageMobileStandingHeader : LeaguePageStandingHeader
        }
        standingTableClassName="league-standing-header"
        clubWidth={isMobile ? 4 : 4}
        flex={isMobile ? [1, 4, 1, 1] : [1, 4, 1, 1, 1, 1, 1]}

      />
    </Box>
  );
};

export const LeagueStanding = withTheme(styled(UnstyledLeagueStanding)`
  .tab-banner-text {
    font-weight: 700;
    color: black;
  }

  .league-standing-team-logo {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    img {
      width: 25px;
      height: 25px;
      margin-right: 1rem;
    }
  }

  .league-standing-header {
    font-size: 1.1rem;
    font-weight: 400;
  }
`);
