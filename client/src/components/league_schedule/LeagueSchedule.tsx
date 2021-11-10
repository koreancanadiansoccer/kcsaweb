import React, { FunctionComponent, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import dayjs from 'dayjs';

import LogoGrey from '../../assets/logo_grey.svg';
import { Match } from '../../types/match';
import { StandingTable } from '../standing_table/StandingTable';
import {
  LeaguePageScheduleHeader,
  LeaguePageMobileScheduleHeader,
} from '../standing_table/standingData';

interface LeagueScheduleProps {
  className?: string;
  matches: Match[];
  isMobile: boolean;
}

/**
 * Generate League Schedule data
 */
const generateScheduleData = (match: Match, isMobile: boolean) => {
  const history = useHistory();
  if (isMobile) {
    return [
      {
        HOME: (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => history.push(`/teams/${match.homeTeam.id}`)}
          >
            <Box fontSize={14} mr={1}>
              {match.homeTeam.team.name.toUpperCase()}
            </Box>
            <img
              height="25px"
              width="25px"
              src={match.homeTeam.team.teamLogoURL || LogoGrey}
              alt={match.homeTeam.team.name}
            />
          </Box>
        ),

        VS: (
          <Box
            className="mobile-vs"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={'80%'}
            height={'66px'}
          >
            {match.status === 'COMPLETE' ? (
              <Typography className="mobile-vs-text">
                {match.homeTeamScore} : {match.awayTeamScore}
              </Typography>
            ) : (
              <Box display="flex" alignItems="center" flexDirection="column">
                <Typography className="mobile-vs-text">
                  {dayjs(match.date, 'YYYY-MM-DDTHH:mm').format('HH:mm')}
                </Typography>
                <Typography className="mobile-vs-text">
                  {match.location}
                </Typography>
              </Box>
            )}
          </Box>
        ),

        AWAY: (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => history.push(`/teams/${match.awayTeam.id}`)}
          >
            <img
              height="25px"
              width="25px"
              src={match.awayTeam.team.teamLogoURL || LogoGrey}
              alt={match.awayTeam.team.name}
            />
            <Box fontSize={14} ml={1}>
              {match.awayTeam.team.name.toUpperCase()}
            </Box>
          </Box>
        ),
      },
    ];
  }
  return [
    {
      HOME: (
        <div
          className="home-team-logo"
          onClick={() => history.push(`/teams/${match.homeTeam.id}`)}
        >
          <div>{match.homeTeam.team.name.toUpperCase()}</div>
          <img
            src={match.homeTeam.team.teamLogoURL || LogoGrey}
            alt={match.homeTeam.team.name}
          />
        </div>
      ),
      VS:
        match.status === 'COMPLETE'
          ? match.homeTeamScore + ' : ' + match.awayTeamScore
          : 'VS',
      AWAY: (
        <div
          className="away-team-logo"
          onClick={() => history.push(`/teams/${match.awayTeam.id}`)}
        >
          <img
            src={match.awayTeam.team.teamLogoURL || LogoGrey}
            alt={match.awayTeam.team.name}
          />
          <div>{match.awayTeam.team.name.toUpperCase()}</div>
        </div>
      ),
      LOCATION: match.location,
      TIME: dayjs(match.date, 'YYYY-MM-DDTHH:mm').format('h:mm A'),
    },
  ];
};

/**
 * League page Schedule table
 */
const UnstyledLeagueSchedule: FunctionComponent<LeagueScheduleProps> = ({
  className,
  matches,
  isMobile,
}) => {
  const matchesGroupRounds = useMemo(() => {
    const orderData = orderBy(matches, ['date', 'id'], ['asc', 'asc']);
    return groupBy(orderData, (match) => match.matchDay);
  }, [matches]);

  return (
    <Box className={className} mt={10}>
      <Box className="tab-banner-box" mb={4}>
        <Typography className="tab-banner-text" variant="h4">
          Schedule & Score
        </Typography>
      </Box>

      {map(matchesGroupRounds, (matchesByRound, key) => {
        const matchDayDate = dayjs(
          matchesByRound[0].date,
          'YYYY-MM-DDTHH:mm'
        ).format('dddd, DD MMMM YYYY');

        return (
          <Accordion className="accordion-container" key={`match-day-${key}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              className="toggle-schedule"
            >
              <Typography variant={isMobile ? "subtitle1" : "h5"} className="match-day-date">
                {matchDayDate}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              {map(matchesByRound, (match) => {
                return (
                  <Box pt={2} pb={isMobile ? 6 : 2}>
                    <StandingTable
                      tableHeaderData={
                        isMobile
                          ? LeaguePageMobileScheduleHeader
                          : LeaguePageScheduleHeader
                      }
                      tableRowData={generateScheduleData(match, isMobile)}
                      headerLongField={['LOCATION', 'TIME']}
                      rowLongField={['LOCATION', 'TIME']}
                      paperShadow={0}
                      hideHeader={'VS'}
                      flexWidth={2}
                      standingTableClassName={'league-schedule-table-box'}
                      headerClassName={
                        isMobile
                          ? 'league-schedule-table-mobile-header'
                          : 'league-schedule-table-header'
                      }
                      rowContentClassName={'league-schedule-row-content'}
                      dividerClassName={'league-schedule-divider'}
                    />
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export const LeagueSchedule = withTheme(styled(UnstyledLeagueSchedule)`
  .accordion-container {
    margin-bottom: 1.8rem;
    box-shadow: none;
  }

  .tab-banner-text {
    font-weight: 700;
    color: black;
  }

  .toggle-schedule {
    background-color: #eeeeee;

    .MuiAccordionSummary-content {
      margin: 0 !important;
    }
  }

  .match-day-date {
    font-weight: bold;
  }

  .league-schedule-table-box {
    padding: 0 0;
  }

  .league-schedule-table-header {
    font-style: italic;
    color: #f17f42;
    font-size: 0.6rem;
    background-color: transparent !important;
  }

  .home-team-logo {
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
      margin-left: 1rem;
    }
  }

  .away-team-logo {
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

  .league-schedule-row-content {
    font-size: 1.2rem;
    font-weight: bold;
    max-height: 66px;

    div {
      padding: 0px 0px;
    }
  }

  .league-schedule-divider {
    margin-top: 1.5rem;
  }

  .mobile-vs {
    background-color: #eeeeee;
    border-radius: 0.5rem;

    .mobile-vs-text {
      font-size: smaller;
      font-weight: 600;
    }
  }

  .league-schedule-table-mobile-header {
    font-style: italic;
    color: #f17f42;
    font-size: 1rem;
    background-color: transparent !important;
    font-weight: bold;
    margin-top: -1rem;
  }
`);
