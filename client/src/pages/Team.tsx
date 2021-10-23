import React, { FunctionComponent, useState, useMemo, useContext } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { useParams } from 'react-router';
import find from 'lodash/find';

import { TeamHero } from '../components/team_hero.tsx/TeamHero';
import { LeagueSelect } from '../components/league_select/LeagueSelect';
import { ViewerContext } from '../context/homeViewer';

interface TeamProps {
  className?: string;
}

enum TabType {
  SQUAD = 'SQUAD',
  SCHEDULE = 'SCHEDULE',
}

/**
 * Team Page.
 * NOTE: This  might be broken into submenu per season.
 */
const UnstyledTeam: FunctionComponent<TeamProps> = () => {
  const { viewer } = useContext(ViewerContext);
  const [teamTabType, setTeamTabType] = useState<TabType>(TabType.SQUAD);
  const { id } = useParams<{ id: string }>();

  const leagueTeam = useMemo(
    () =>
      find(
        viewer.leagueTeams,
        (leagueTeam) => leagueTeam.id === parseInt(id, 10)
      ),
    [id]
  );

  return (
    <Box>
      {/* Teams - hero */}
      <TeamHero
        teamColor={leagueTeam?.team.teamColor}
        name={leagueTeam?.name}
        captain={'test'}
        foundedDate={leagueTeam?.team.foundedDate}
        teamLogo={leagueTeam?.team.teamLogoURL}
      />

      <Box borderRadius={64} mt={-6} bgcolor="white" py={5}>
        <Container>
          <Box display="flex" justifyContent="start">
            <LeagueSelect
              title="SQUAD"
              selected={teamTabType === TabType.SQUAD}
              onClick={() => setTeamTabType(TabType.SQUAD)}
            />

            <LeagueSelect
              title="SCHEDULE"
              selected={teamTabType === TabType.SCHEDULE}
              onClick={() => setTeamTabType(TabType.SCHEDULE)}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export const Team = withTheme(styled(UnstyledTeam)``);
