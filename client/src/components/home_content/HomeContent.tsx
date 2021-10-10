import React, { FunctionComponent, useState } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';

import { LeagueTable } from '../league_table/LeagueTable';
import { LeagueSelect } from '../league_select/LeagueSelect';
import { AgeEnums } from '../../types/age.enum';
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
  const [league, setLeague] = useState<AgeEnums>(AgeEnums.OPEN);

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
                selected={league === AgeEnums.OPEN}
                onClick={() => setLeague(AgeEnums.OPEN)}
              />

              <LeagueSelect
                title="SENIOR"
                selected={league === AgeEnums.SENIOR}
                onClick={() => setLeague(AgeEnums.SENIOR)}
              />
            </Box>

            {/* League table */}
            {league === AgeEnums.OPEN && (
              <motion.div
                initial={{ opacity: 0, x: -50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* League table */}
                <LeagueTable
                  tableType={TableType.STANDING}
                  leagueType={AgeEnums.OPEN}
                />
                {/* Score table */}
                <Box mt={5}>
                  <LeagueTable
                    tableType={TableType.SCORER}
                    leagueType={AgeEnums.OPEN}
                  />
                </Box>
              </motion.div>
            )}

            {league === AgeEnums.SENIOR && (
              <motion.div
                initial={{ opacity: 0, x: -50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* League table */}
                <LeagueTable
                  tableType={TableType.STANDING}
                  leagueType={AgeEnums.SENIOR}
                />

                {/* Score table */}
                <Box mt={5}>
                  <LeagueTable
                    tableType={TableType.SCORER}
                    leagueType={AgeEnums.SENIOR}
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
