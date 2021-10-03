import React, { FunctionComponent, useMemo, useState } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import { useQuery } from "@apollo/client";
import map from "lodash/map";

import { League } from "../../types/league";
import { Team, LeagueTeam } from "../../types/team";
import {
  GET_TEAMS,
  TeamsQueryData,
  TeamsQueryVariable,
} from "../../graphql/teams/get_teams.query";
import { Table } from "../table/Table";
import { AddLeagueTeamModal } from "./modals/AddLeagueTeamModal";
import { Button } from "../button/Button";

const tableColumns = [
  { title: "Name", field: "name" },
  { title: "Age", field: "teamAgeType" },
  { title: "Played", field: "played" },
  { title: "Gs", field: "goalScored" },
  { title: "GCs ", field: "goalConceded" },
  { title: "Win", field: "win" },
  { title: "Loss", field: "loss" },
  { title: "Created at", field: "createdAt" },
];

interface LeagueTeamsProps {
  league: League;
  updateLeague: (newTeams: Team[]) => Promise<void>;
}

/**
 * Show and allow update to teams associated with league.
 */
const UnstyledLeagueTeams: FunctionComponent<LeagueTeamsProps> = ({
  league,
  updateLeague,
}) => {
  const [leagueTeams] = useState<LeagueTeam[]>(league.leagueTeams);

  const [openModal, setOpenModal] = useState<boolean>(false);

  // Get all teams.
  const teamQuery = useQuery<TeamsQueryData, TeamsQueryVariable>(GET_TEAMS, {
    variables: { leagueAgeType: league.leagueAgeType },
  });

  /**
   * Set table data.
   */
  const tableData: Team[] = useMemo(() => {
    return map(leagueTeams, (team) => {
      return { ...team, teamCount: leagueTeams?.length };
    });
  }, [leagueTeams]);

  return (
    <>
      {teamQuery.data && !teamQuery.loading && (
        <AddLeagueTeamModal
          open={openModal}
          age={league.leagueAgeType}
          teams={teamQuery.data.getTeams}
          leagueTeams={leagueTeams}
          onClose={() => setOpenModal(false)}
          updateLeague={(newTeams) => {
            void updateLeague(newTeams);
            setOpenModal(false);
          }}
        />
      )}

      <Box>
        <Box>Teams </Box>

        <Box my={3}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            color="secondary"
          >
            Add Teams
          </Button>
        </Box>

        <Table
          title="Teams registered"
          columns={tableColumns}
          data={tableData}
          onRowClick={(evt, data) => {
            if (data?.id) {
              // history.push(`/admin/team/${data.id}`);
            }
          }}
          options={{
            pageSize: 10,
            rowStyle: (data) => {
              return data.isActive
                ? { background: "white" }
                : { background: "#EEEEEE" };
            },
          }}
        />
      </Box>
    </>
  );
};

export const LeagueTeams = withTheme(styled(UnstyledLeagueTeams)``);
