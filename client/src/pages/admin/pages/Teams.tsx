import React, { FunctionComponent, useEffect, useState, useMemo } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { map } from "lodash";

import { GET_TEAMS } from "../../../graphql/teams/get_teams.query";
import { parseError } from "../../../graphql/client";
import { Table } from "../../../components/table/Table";
import { Button } from "../../../components/button/Button";
import { Team } from "../../../types/team";

interface TeamsProps {
  className?: string;
}

const tableColumns = [
  { title: "Name", field: "name" },
  { title: "Age Group", field: "teamAgeType" },
  { title: "isActive", field: "isActive" },
  { title: "Created", field: "createdAt" },
];

const UnstyledTeams: FunctionComponent<TeamsProps> = ({ className }) => {
  const [teams, setTeams] = useState<Team[]>();
  // Get Teams data.
  const teamsQuery = useQuery(GET_TEAMS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  // Pull league data.
  useEffect(() => {
    setLoading(teamsQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && teamsQuery?.data?.getTeams) {
      setTeams(teamsQuery.data.getTeams);
    }

    if (teamsQuery.error) {
      setError(parseError(teamsQuery.error));
    }
  }, [teamsQuery, loading, error]);

  /**
   * Set table data.
   */
  const tableData: Team[] = useMemo(() => {
    return map(teams, (team) => {
      return { ...team };
    });
  }, [teams]);

  return (
    <Box>
      <Typography variant="h4">Teams</Typography>

      <Box my={3}>
        <Button
          startIcon={<AddIcon />}
          // onClick={() => setOpenModal(true)}
          color="secondary"
        >
          Create New Team
        </Button>
      </Box>

      <Table
        title="Team Info"
        columns={tableColumns}
        data={tableData}
        onRowClick={(evt, data) => {
          if (data?.id) {
            history.push(`/admin/team/${data.id}`);
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
  );
};

export const Teams = withTheme(styled(UnstyledTeams)``);