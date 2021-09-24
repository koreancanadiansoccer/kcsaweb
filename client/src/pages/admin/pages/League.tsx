import React, { FunctionComponent, useState } from "react";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

import { LeagueInput } from "../../../types/league";
import { AddLeagueModal } from "../../../components/admin_league/AddLeagueModal";
import {
  CREATE_LEAGUE,
  LeagueData,
  CreateLeagueDataInput,
} from "../../../graphql/league/create_league.mutation";
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

  const [createLeagueMut, createLeagueMutObj] = useMutation<
    LeagueData,
    CreateLeagueDataInput
  >(CREATE_LEAGUE);

  const createLeague = async (newLeague: LeagueInput) => {
    console.log("create league");
    try {
      const res = await createLeagueMut({
        variables: {
          name: newLeague.name,
          leagueType: newLeague.leagueType,
        },
      });

      console.log("result!");
      console.log(res);
    } catch (e) {
      const error = parseError(e);
      console.log("erro");
      console.log(error);
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
