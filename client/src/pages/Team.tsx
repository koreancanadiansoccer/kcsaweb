import React, { FunctionComponent, useState, useMemo, useContext } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { useParams } from 'react-router';
import find from 'lodash/find';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';

import { TeamHero } from '../components/team_hero/TeamHero';
import { TeamPlayers } from '../components/team_players/TeamPlayers';
import { TeamHistory } from '../components/team_history/TeamHistory';
import { TeamSchedule } from '../components/team_schedule/TeamSchedule';
import { LeagueSelect } from '../components/league_select/LeagueSelect';
import { ViewerContext } from '../context/homeViewer';

interface TeamProps {
  className?: string;
}

enum TabType {
  SQUAD = 'SQUAD',
  SCHEDULE = 'SCHEDULE',
  HISTORY = 'HISTORY',
}

/**
 * Team Page.
 * NOTE: This  might be broken into submenu per season.
 */
const UnstyledTeam: FunctionComponent<TeamProps> = ({ className }) => {
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

  const teamMatches = useMemo(() => {
    const matches = filter(
      viewer.matches,
      (match) =>
        match.awayTeam.id === parseInt(id, 10) ||
        match.homeTeam.id === parseInt(id, 10)
    );
    return orderBy(matches, (match) => match.matchDay);
  }, [id]);

  if (!leagueTeam) return <Box>Loading</Box>;

  return (
    <Box className={className}>
      {/* Teams - hero */}
      <TeamHero
        teamColor={leagueTeam?.team.teamColor}
        name={leagueTeam?.team.name.toUpperCase()}
        captain={leagueTeam?.team.captain}
        foundedDate={leagueTeam?.team.foundedDate}
        teamLogo={leagueTeam?.team.teamLogoURL}
      >
        <Box borderRadius={32} mt={10} bgcolor="white" color={'black'} py={5}>
          <Container>
            <Box display="flex" justifyContent="start">
              <Box mr={5}>
                <LeagueSelect
                  title="SQUAD"
                  selected={teamTabType === TabType.SQUAD}
                  onClick={() => setTeamTabType(TabType.SQUAD)}
                />
              </Box>

              <Box mr={5}>
                <LeagueSelect
                  title="SCHEDULE"
                  selected={teamTabType === TabType.SCHEDULE}
                  onClick={() => setTeamTabType(TabType.SCHEDULE)}
                />
              </Box>
              <LeagueSelect
                title="HISTORY/STATS"
                selected={teamTabType === TabType.HISTORY}
                onClick={() => setTeamTabType(TabType.HISTORY)}
              />
            </Box>

            {teamTabType === TabType.SQUAD && (
              <Box mt={5}>
                <TeamPlayers players={leagueTeam.leaguePlayers} />
              </Box>
            )}

            {teamTabType === TabType.SCHEDULE && (
              <Box mt={5}>
                <TeamSchedule teamMatches={teamMatches} />
              </Box>
            )}

            {teamTabType === TabType.HISTORY && (
              <Box mt={5}>
                <TeamHistory leagueTeam={leagueTeam} />
              </Box>
            )}
          </Container>
        </Box>
      </TeamHero>
    </Box>
  );
};

export const Team = withTheme(styled(UnstyledTeam)``);
