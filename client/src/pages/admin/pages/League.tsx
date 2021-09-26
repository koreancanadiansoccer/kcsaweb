import React, { FunctionComponent, useEffect, useState, useMemo } from "react";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";

import { LeagueInput } from "../../../types/league";
import { AddLeagueModal } from "../../../components/admin_league/AddLeagueModal";
import {
  CREATE_LEAGUE,
  LeagueData,
  CreateLeagueDataInput,
} from "../../../graphql/league/create_league.mutation";
import {
  GET_LEAGUES,
  LeagueQueryData,
} from "../../../graphql/league/get_leagues.query";
import { parseError } from "../../../graphql/client";

export enum LeagueModalType {
  Open,
  Close,
}

interface LeagueProps {
  className?: string;
}

/**
 * Main home page.
 */
const UnstyledLeague: FunctionComponent<LeagueProps> = ({ className }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [leagues, setLeagues] = useState<LeagueQueryData | undefined>();
  // Get League data.
  const leagueDataQuery = useQuery(GET_LEAGUES);

  const [createLeagueMut, createLeagueMutObj] = useMutation<
    LeagueData,
    CreateLeagueDataInput
  >(CREATE_LEAGUE);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        },
      });
      if (res.data) {
      }
    } catch (e) {
      setError(parseError(e));
    }
  };

  return (
    <>
      <AddLeagueModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newLeague) => createLeague(newLeague)}
      />

      <h3>League</h3>
      <Button startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
        Create New League
      </Button>
    </>
  );
};

export const League = withTheme(styled(UnstyledLeague)``);
