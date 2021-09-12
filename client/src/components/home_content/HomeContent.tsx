import React, { FunctionComponent, useState } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import { LeagueTable } from "../league_table/LeagueTable";
import { LeagueSelect } from "../league_select/LeagueSelect";
import { LeagueType } from "../../types/league_type";
import { TableType } from "../../types/table_type";

import MainContentImg from "../../assets/main_content.png";

interface HomeContentProps {
  className?: string;
}

/**
 * Main content section shown on home page (below hero component).
 */
export const UnstyledHomeContent: FunctionComponent<HomeContentProps> = ({
  className,
}) => {
  const [league, setLeague] = useState<LeagueType>(LeagueType.OPEN);

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
                selected={league === LeagueType.OPEN}
                onClick={() => setLeague(LeagueType.OPEN)}
              />

              <LeagueSelect
                title="SENIOR"
                selected={league === LeagueType.SENIOR}
                onClick={() => setLeague(LeagueType.SENIOR)}
              />
            </Box>

            {/* League table */}
            <LeagueTable
              tableType={TableType.STANDING}
              leagueType={
                league === LeagueType.SENIOR
                  ? LeagueType.SENIOR
                  : LeagueType.OPEN
              }
            />

            {/* Score table */}
            <Box mt={5}>
              <LeagueTable
                tableType={TableType.SCORER}
                leagueType={
                  league === LeagueType.SENIOR
                    ? LeagueType.SENIOR
                    : LeagueType.OPEN
                }
              />
            </Box>
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
