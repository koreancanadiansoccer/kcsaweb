import React, { FunctionComponent, useState, useContext, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';


import LogoGrey from '../../assets/logo_grey.svg';
import { LeagueTable } from '../league_table/LeagueTable';
import { LeagueSelect } from '../league_select/LeagueSelect';
import { TableType } from '../../types/table_type';
import { GallerySlide } from '../gallery_slide/GallerySlide';
import { ViewerContext } from '../../context/homeViewer';
import { LeaeguePlayerHomeViewer } from '../../types/home_viewer';
import { LeagueTeam } from '../../types/team';

interface HomeContentProps {
  className?: string;
}
/**
 * Generate standings data.
 */
const generateStandingData = (leagueTeams: LeagueTeam[]) => {
  const orderedData = orderBy(
    map(leagueTeams, (leagueTeam) => {
      return {
        name: (
          <div className="team-logo">
            <img
              src={leagueTeam.team.teamLogoURL || LogoGrey}
              alt="hero-main"
            />
            <div>{leagueTeam.team.name}</div>
          </div>
        ),
        played: leagueTeam.played,
        GD: leagueTeam.goalScored - leagueTeam.goalConceded,
        points: leagueTeam.win * 3 + leagueTeam.tie,
      };
    }),
    ['points', 'GD'],
    ['desc', 'desc']
  );
  return map(orderedData, (data, idx) => ({ pos: idx + 1, ...data }));
};

/**
 * Generate scorer data.
 */
const generateScorerData = (leaguePlayers: LeaeguePlayerHomeViewer[]) => {
  const orderedData = orderBy(
    map(leaguePlayers, (leaguePlayer) => {
      return {
        name: `${leaguePlayer.player.firstName} ${leaguePlayer.player.lastName}`,
        club: (
          <div className="team-logo">
            <img src={leaguePlayer.teamLogoURL || LogoGrey} alt="hero-main" />
            <div style={{ marginRight: '0.5rem' }}>{leaguePlayer.teamName}</div>
          </div>
        ),
        goals: leaguePlayer.goalScored,
      };
    }),
    ['points', 'GD'],
    ['desc', 'desc']
  );
  return map(orderedData, (data, idx) => ({ pos: idx + 1, ...data }));
};

/**
 * Main content section shown on home page (below hero component).
 */
const UnstyledHomeContent: FunctionComponent<HomeContentProps> = ({
  className,
}) => {
  const { viewer } = useContext(ViewerContext);

  const [tableAgeType, setTableAgeType] = useState<string>(
    viewer.leagueAgeKeys ? viewer.leagueAgeKeys[0] : 'OPEN'
  );

  if (!viewer?.leagueTeamGroupAge) {
    return <Box>...Loading</Box>;
  }

  const leagueStandingData = useMemo(() => {
    if (!viewer.leagueTeamGroupAge) return null;
    return generateStandingData(viewer.leagueTeamGroupAge[tableAgeType]);
  }, [viewer, tableAgeType]);

  const leagueScorerData = useMemo(() => {
    if (!viewer.leaguePlayersGroupAge) return null;
    return generateScorerData(
      orderBy(
        viewer.leaguePlayersGroupAge[tableAgeType],
        ['goalScored'],
        ['desc']
      ).slice(0, 10)
    );
  }, [viewer, tableAgeType]);

  return (
    <Box my={5} className={className}>
      <Container>
        <Box display="flex" justifyContent="start" alignItems="start">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
            minWidth={275}
          >
            {/* League selection */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={5}
            >
              {map(viewer.leagueAgeKeys, (leagueAge) => (
                <Box key={`home-table-league-selection-${leagueAge}`}>
                  <LeagueSelect
                    title={leagueAge}
                    selected={tableAgeType === leagueAge}
                    onClick={() => setTableAgeType(leagueAge)}
                  />
                </Box>
              ))}
            </Box>

            {/* League table */}
            {map(viewer.leagueAgeKeys, (leagueAge) => (
              <Box key={`league-standing-score-table-${leagueAge}`}>
                {tableAgeType === leagueAge && (
                  <motion.div
                    initial={{ opacity: 0, x: -50, y: -50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* League table */}
                    <LeagueTable
                      tableType={TableType.STANDING}
                      tableAgeType={tableAgeType}
                      tableRowData={leagueStandingData}
                    />
                    {/* Score table */}
                    <Box mt={5}>
                      <LeagueTable
                        tableType={TableType.SCORER}
                        leagueType={tableAgeType}
                        tableRowData={leagueScorerData}
                      />
                    </Box>
                  </motion.div>
                )}
              </Box>
            ))}
          </Box>

          {/* Galleries Slide Show */}
          <GallerySlide />
        </Box>
      </Container>
    </Box>
  );
};

export const HomeContent = withTheme(styled(UnstyledHomeContent)`
  .team-logo {

  }
`);
