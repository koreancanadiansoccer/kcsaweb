import React, { FunctionComponent, useState, useMemo, useContext } from 'react';
import { withTheme, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router';
import find from 'lodash/find';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AboutBanner from '../assets/about.png';
import { ViewerContext } from '../context/homeViewer';
import { LeagueSelect } from '../components/league_select/LeagueSelect';
import { LeagueStanding } from '../components/league_standing/LeagueStanding';
import { LeagueSchedule } from '../components/league_schedule/LeagueSchedule';

interface LeagueProps {
  className?: string;
}

enum TabType {
  STANDING = 'STANDING',
  SCHEDULE_SCORE = 'SCHEDULE_SCORE',
}

/**
 * League Page.
 * NOTE: This  might be broken into submenu per season.
 */
const UnstyledLeague: FunctionComponent<LeagueProps> = ({ className }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { viewer } = useContext(ViewerContext);
  const [teamTabType, setTeamTabType] = useState<TabType>(TabType.STANDING);
  const { id } = useParams<{ id: string }>();

  const league = useMemo(
    () => find(viewer.leagues, (league) => league.id === parseInt(id, 10)),
    [id]
  );

  if (!league || !viewer.leagueTeamGroupAge || !viewer.matchesByAge)
    return <div>Loading...</div>;

  return (
    <Box className={className}>
      <Box
        className="league-banner-container"
        display="flex"
        alignItems="center"
        height={isMobile ? '100px' : '240px'}
      >
        <Container>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            color="white"
            flexDirection="column"
            fontSize={isMobile ? 24 : '2.5rem'}
            fontWeight={700}
          >
            {league?.name} {league.year} {league.leagueType}{' '}
            {league.leagueAgeType}
          </Box>
        </Container>
      </Box>

      <Container>
        <Box display="flex" justifyContent="start" mt={6}>
          <LeagueSelect
            mt={7}
            title="STANDING"
            selected={teamTabType === TabType.STANDING}
            onClick={() => setTeamTabType(TabType.STANDING)}
          />

          <LeagueSelect
            mt={7}
            title="SCHEDULE & SCORE"
            selected={teamTabType === TabType.SCHEDULE_SCORE}
            onClick={() => setTeamTabType(TabType.SCHEDULE_SCORE)}
          />
        </Box>

        {teamTabType === TabType.STANDING && (
          <LeagueStanding
            className="standing-table"
            teams={viewer.leagueTeamGroupAge[league.leagueAgeType]}
            isMobile={isMobile}
          />
        )}

        {teamTabType === TabType.SCHEDULE_SCORE && (
          <LeagueSchedule
            className="schedule-table"
            matches={viewer.matchesByAge[league.leagueAgeType]}
            isMobile={isMobile}
          />
        )}
      </Container>
    </Box>
  );
};

export const League = withTheme(styled(UnstyledLeague)`
  .league-banner-container {
    background-image: url(${AboutBanner});
    min-width: 100px; /*or 70%, or what you want*/
    background-size: 100% 100%;
  }

  .standing-table {
    font-size: 1.04rem;
    margin-bottom: 5rem;
  }

  .schedule-table {
    margin-bottom: 5rem;
  }
`);
