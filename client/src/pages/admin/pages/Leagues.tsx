import React, { FunctionComponent, useEffect, useState, useMemo } from "react";
import { withTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { map } from "lodash";

import { LeagueInput } from "../../../types/league";
import { AddLeagueModal } from "../../../components/admin_league/AddLeagueModal";
import { Table } from "../../../components/table/Table";
import { Button } from "../../../components/button/Button";
import {
  CREATE_LEAGUE,
  CreateLeagueResult,
  CreateLeagueDataInput,
} from "../../../graphql/league/create_league.mutation";
import { GET_LEAGUES } from "../../../graphql/league/get_leagues.query";
import { League } from "../../../types/league";
import { parseError } from "../../../graphql/client";

export enum LeagueModalType {
  Open,
  Close,
}

interface LeaguesProps {
  className?: string;
}

const tableColumns = [
  { title: "Name", field: "name" },
  { title: "League Age", field: "leagueAgeType" },
  { title: "League Type", field: "leagueType" },
  { title: "Active", field: "isActive" },
  { title: "Team count", field: "teamCount" },
  { title: "Created", field: "createdAt" },
];

/**
 * Main home page.
 */
const UnstyledLeagues: FunctionComponent<LeaguesProps> = ({ className }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [leagues, setLeagues] = useState<League[]>();

  // Get League data.
  const leagueDataQuery = useQuery(GET_LEAGUES);

  const history = useHistory();

  const [createLeagueMut] = useMutation<
    CreateLeagueResult,
    CreateLeagueDataInput
  >(CREATE_LEAGUE);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pull league data.
  useEffect(() => {
    setLoading(leagueDataQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && leagueDataQuery?.data?.getLeagues) {
      setLeagues(leagueDataQuery.data.getLeagues);
    }

    if (leagueDataQuery.error) {
      setError(parseError(leagueDataQuery.error));
    }
  }, [leagueDataQuery, loading, error]);

  const createLeague = async (newLeague: LeagueInput) => {
    setLoading(true);

    try {
      const res = await createLeagueMut({
        variables: {
          name: newLeague.name,
          leagueType: newLeague.leagueType,
          leagueAgeType: newLeague.leagueAgeType,
          maxYellowCard: newLeague.maxYellowCard,
        },
      });
      if (res.data) {
        setLeagues(res.data.createLeague);
        setOpenModal(false);
      }
    } catch (e) {
      setError(parseError(e));
    }
  };

  /**
   * Set table data.
   */
  const tableData: League[] = useMemo(() => {
    return map(leagues, (league) => {
      return { ...league, teamCount: league.leagueTeams?.length };
    });
  }, [leagues]);

  return (
    <>
      <AddLeagueModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newLeague) => createLeague(newLeague)}
      />

      <Typography variant="h4">League</Typography>

      <Box my={3}>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          color="secondary"
        >
          Create New League
        </Button>
      </Box>

      <Table
        title="League Info"
        columns={tableColumns}
        data={tableData}
        onRowClick={(evt, data) => {
          if (data?.id) {
            history.push(`/admin/league/${data.id}`);
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
    </>
  );
};

export const Leagues = withTheme(styled(UnstyledLeagues)``);
