import React, { FunctionComponent, useState, useMemo } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { useParams } from "react-router";
import find from "lodash/find";

import { TeamHero } from "../components/team_hero.tsx/TeamHero";
import { LeagueSelect } from "../components/league_select/LeagueSelect";
import { darkenColor } from "../utils/color";
import GunnersLogo from "../assets/gunners_logo.svg";

interface TeamProps {
  className?: string;
}

enum TabType {
  SQUAD = "SQUAD",
  SCHEDULE = "SCHEDULE",
}

const teamSampleData = [
  {
    id: "1",
    name: "Gunners",
    color: "purple",
    captain: "Justin Kim",
    foundedDate: "August 2008",
    mission: "Create a community for players to play and improve together.",
    teamLogo: GunnersLogo,
  },
  {
    id: "2",
    name: "Outliers",
    color: "blue",
    captain: "Jiho Kim",
    foundedDate: "January 2006",
    mission: "Create a community for players to play and improve together.",
  },
  {
    id: "3",
    name: "TFT",
    color: "orange",
    captain: "Yoon Cho",
    foundedDate: "January 2020",
    mission: "Create a community for players to play and improve together.",
  },
  {
    id: "4",
    name: "CICC",
    color: "white",
    captain: "MOON",
    foundedDate: "January 2018",
    mission: "Create a community for players to play and improve together.",
  },
  {
    id: "5",
    name: "Red Devils",
    color: "red",
    captain: "Jun",
    foundedDate: "January 2010",
    mission: "Create a community for players to play and improve together.",
  },
];

/**
 * Team Page.
 * NOTE: This  might be broken into submenu per season.
 */
const UnstyledTeam: FunctionComponent<TeamProps> = ({ className }) => {
  const [league, setLeague] = useState<TabType>(TabType.SQUAD);
  const { id } = useParams<{ id: string }>();

  const { name, color, captain, foundedDate, mission, teamLogo } = useMemo(
    () =>
      find(teamSampleData, (data) => data.id === id) || {
        id: "1",
        name: "Gunners",
        color: "purple",
        captain: "Justin Kim",
        foundedDate: "January 2020",
        mission: "Create a community for players to play and improve together.",
      },
    [id]
  );

  return (
    <Box>
      {/* Teams - hero */}
      <TeamHero
        teamColor={darkenColor(color)}
        name={name}
        captain={captain}
        foundedDate={foundedDate}
        mission={mission}
        teamLogo={teamLogo}
      />

      <Box borderRadius={64} mt={-6} bgcolor="white" py={5}>
        <Container>
          <Box display="flex" justifyContent="start">
            <LeagueSelect
              title="SQUAD"
              selected={league === TabType.SQUAD}
              onClick={() => setLeague(TabType.SQUAD)}
            />

            <LeagueSelect
              title="SCHEDULE"
              selected={league === TabType.SCHEDULE}
              onClick={() => setLeague(TabType.SCHEDULE)}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export const Team = withTheme(styled(UnstyledTeam)``);
