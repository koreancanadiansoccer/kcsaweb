import React, { FunctionComponent, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import LogoGrey from '../../assets/logo_grey.svg';
import { LeagueTeam } from '../../types/team';
import { StandingTable } from '../standing_table/StandingTable';
import { leaguePageStandHeader } from '../standing_table/standingData';



interface LeagueStandingProps {
  className?: string;
  teams: LeagueTeam[] | null;
}

/**
 * Generate League standings data.
 */
const generateStandingData = (leagueTeams: LeagueTeam[]) => {
  const history = useHistory();
  const orderData = orderBy(
    map(leagueTeams, (leagueTeam) => {
      return {
        club: (
          <div
            className="team-logo"
            onClick={() => history.push(`/teams/${leagueTeam.id}`)}
          >
            <img
              src={leagueTeam.team.teamLogoURL || LogoGrey}
              alt="league-tab-standing"
            />
            <div>{leagueTeam.team.name}</div>
          </div>
        ),
        Played: leagueTeam.played,
        Won: leagueTeam.win,
        Drawn: leagueTeam.tie,
        Lost: leagueTeam.loss,
        Point: leagueTeam.win * 3 + leagueTeam.tie,
      };
    }),
    ['Won', 'Drawn'],
    ['desc', 'desc']
  );

  return map(orderData, (data, idx) => ({ Position: idx + 1, ...data }));
}

/**
 * League page standings table
 */
const UnstyledLeagueStanding: FunctionComponent<LeagueStandingProps> = ({
  className,
  teams,
}) => {
  const leagueStandingData = useMemo(() => {
    if (!teams) return null;
    return generateStandingData(teams);
  }, [teams]);

  return (
    <Box className={className} mt={10}>
      <Box className="tab-banner-box" mb={4}>
        <Typography className="tab-banner-text" variant="h4">
          Standing
        </Typography>
      </Box>

      <StandingTable
        tableRowData={leagueStandingData}
        tableHeaderData={leaguePageStandHeader}
        headerLongField={['Club']}
        rowLongField={['name', 'club']}
      />
    </Box>
  );
};

export const LeagueStanding = withTheme(styled(UnstyledLeagueStanding)`
  .tab-banner-text {
    font-weight: 700;
    color: black;
  }

  .team-logo {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;

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

  .table-header {
    font-size: 1.1rem;
    font-weight: 400;
  }
`);
