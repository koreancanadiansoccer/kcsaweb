import React, { FunctionComponent, useState, useMemo, useContext } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router';
import Typography from '@material-ui/core/Typography';
import find from 'lodash/find';

import AboutBanner from '../assets/about.png';
import { ViewerContext } from '../context/homeViewer';
import { LeagueSelect } from '../components/league_select/LeagueSelect';

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
  const { viewer } = useContext(ViewerContext);
  const [teamTabType, setTeamTabType] = useState<TabType>(TabType.STANDING);
  const { id } = useParams<{ id: string }>();

  const leagueActive = useMemo(
    () =>
      find(
        viewer.leagueActive,
        (league) => league.id === parseInt(id, 10)
      ), [id]
  );

  if (!leagueActive) return <div>Loading...</div>

  return (
    <Box className={className}>
      <Box
        className="media-banner-container"
        display="flex"
        alignItems="center"
      >
        <Typography variant="h3" className="media-banner-text">
          {leagueActive?.name}
        </Typography>
      </Box>

      <Container>
        <Box
          className="leagueSelect-box"
          display="flex"
          justifyContent="start"
          mt={6}
        >
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
      </Container>
    </Box>
  );
};

export const League = withTheme(styled(UnstyledLeague)`
  .media-banner-container {
    background-image: url(${AboutBanner});
    min-width: 100px; /*or 70%, or what you want*/
    height: 284px; /*or 70%, or what you want*/
    background-size: 100% 100%;

    .media-banner-text {
      font-weight: 700;
      color: white;
      margin-left: 7rem;
    }
  }

  // .leagueSelect-box {
  //   display: flex;
  //   justify-content: start;
  //   margin-top: 3rem;

  //   .div {
  //     margin-left: 2rem;
  //   }
  // }
`);
