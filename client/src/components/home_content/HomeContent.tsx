import React, { FunctionComponent, useState, useContext, useMemo } from 'react';
import { withTheme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';

import LogoGrey from '../../assets/logo_grey.svg';
import { LeagueTable } from '../league_table/LeagueTable';
import { LeagueSelect } from '../league_select/LeagueSelect';
import { TableType } from '../../types/table_type';
import { GallerySlide } from '../gallery_slide/GallerySlide';
import { ViewerContext } from '../../context/homeViewer';
import { LeaeguePlayerHomeViewer } from '../../types/home_viewer';
import { LeagueTeam } from '../../types/team';
import {
  leagueAgeKeysDefault,
  standingDefaultData,
  scorerDefaultData,
} from '../standing_table/defaultData';

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
        club: (
          <div className="team-logo">
            <img
              src={leagueTeam.team.teamLogoURL || LogoGrey}
              alt="hero-main"
            />
            <div>{leagueTeam.team.name.toUpperCase()}</div>
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
            <div style={{ marginRight: '0.5rem' }}>
              {leaguePlayer.teamName.toUpperCase()}
            </div>
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { viewer } = useContext(ViewerContext);

  const [tableAgeType, setTableAgeType] = useState<string>(
    isEmpty(viewer.leagueAgeKeys) || !viewer.leagueAgeKeys
      ? 'OPEN'
      : viewer.leagueAgeKeys[0]
  );

  const leagueAgeKeysOption = useMemo(() => {
    if (isEmpty(viewer.leagueAgeKeys) || !viewer.leagueAgeKeys)
      return leagueAgeKeysDefault;
    return viewer.leagueAgeKeys;
  }, [viewer, viewer.leagueAgeKeys]);

  const leagueStandingData = useMemo(() => {
    if (
      isEmpty(viewer.leagueTeamGroupAge) ||
      !viewer.leagueTeamGroupAge ||
      isEmpty(viewer.leagueTeamGroupAge[tableAgeType])
    ) {
      return standingDefaultData;
    }

    return generateStandingData(viewer.leagueTeamGroupAge[tableAgeType]);
  }, [viewer, tableAgeType]);

  const leagueScorerData = useMemo(() => {
    if (
      isEmpty(viewer.leaguePlayersGroupAge) ||
      !viewer.leaguePlayersGroupAge ||
      isEmpty(viewer.leaguePlayersGroupAge[tableAgeType])
    ) {
      return scorerDefaultData;
    }
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
        <Box
          display={isMobile ? '' : 'flex'}
          justifyContent={isMobile ? '' : 'start'}
          alignItems={isMobile ? '' : 'start'}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
            minWidth={275}
          >
            {/* League selection */}
            <Box
              display={'flex'}
              justifyContent={isMobile ? 'center' : 'center'}
              alignItems={'center'}
              mb={5}
            >
              {map(leagueAgeKeysOption, (leagueAge) => (
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
            {map(leagueAgeKeysOption, (leagueAge) => (
              <Box
                key={`league-standing-score-table-${leagueAge}`}
                width={'100%'}
              >
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
          {!isMobile && (
            <Box mt={9.2}>
              <GallerySlide />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export const HomeContent = withTheme(styled(UnstyledHomeContent)``);
