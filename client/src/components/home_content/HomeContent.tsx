import React, { FunctionComponent, useState } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';

import { LeagueTable } from '../league_table/LeagueTable';
import { LeagueSelect } from '../league_select/LeagueSelect';
import { LeagueAgeType } from '../../types/league';
import { TableType } from '../../types/table_type';
import MainContentImg from '../../assets/main_content.png';

interface HomeContentProps {
  className?: string;
}

/**
 * Main content section shown on home page (below hero component).
 */
const UnstyledHomeContent: FunctionComponent<HomeContentProps> = ({
  className,
}) => {
  const [league, setLeague] = useState<LeagueAgeType>(LeagueAgeType.OPEN);

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
              <LeagueSelect
                title="OPEN"
                selected={league === LeagueAgeType.OPEN}
                onClick={() => setLeague(LeagueAgeType.OPEN)}
              />

              <LeagueSelect
                title="SENIOR"
                selected={league === LeagueAgeType.SENIOR}
                onClick={() => setLeague(LeagueAgeType.SENIOR)}
              />
            </Box>

            {/* League table */}
            {league === LeagueAgeType.OPEN && (
              <motion.div
                initial={{ opacity: 0, x: -50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* League table */}
                <LeagueTable
                  tableType={TableType.STANDING}
                  leagueType={LeagueAgeType.OPEN}
                />
                {/* Score table */}
                <Box mt={5}>
                  <LeagueTable
                    tableType={TableType.SCORER}
                    leagueType={LeagueAgeType.OPEN}
                  />
                </Box>
              </motion.div>
            )}

            {league === LeagueAgeType.SENIOR && (
              <motion.div
                initial={{ opacity: 0, x: -50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* League table */}
                <LeagueTable
                  tableType={TableType.STANDING}
                  leagueType={LeagueAgeType.SENIOR}
                />

                {/* Score table */}
                <Box mt={5}>
                  <LeagueTable
                    tableType={TableType.SCORER}
                    leagueType={LeagueAgeType.SENIOR}
                  />
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Main image */}
          <Box>
            <img src={MainContentImg} alt="hero-main" className="hero-main" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export const HomeContent = withTheme(styled(UnstyledHomeContent)``);
