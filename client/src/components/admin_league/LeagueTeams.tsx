import React, { FunctionComponent, useMemo, useState } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import { useQuery } from "@apollo/client";
import map from "lodash/map";

import { League } from "../../types/league";
import { Team } from "../../types/team";
import { GET_TEAMS } from "../../graphql/teams/get_teams.query";
import { Table } from "../table/Table";
import { AddLeagueTeamModal } from "./AddLeagueTeamModal";
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
  updateLeague: (newTeams: Team[]) => void;
}

const UnstyledLeagueTeams: FunctionComponent<LeagueTeamsProps> = ({
  league,
  updateLeague,
}) => {
  const [leagueTeams, setLeagueTeams] = useState<Team[]>(league.leagueTeams);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Get all teams.
  const teamQuery = useQuery(GET_TEAMS, {
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
          teams={teamQuery.data.getTeams}
          onClose={() => setOpenModal(false)}
          updateLeague={(newTeams) => {
            console.log(newTeams);
            updateLeague(newTeams);
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
