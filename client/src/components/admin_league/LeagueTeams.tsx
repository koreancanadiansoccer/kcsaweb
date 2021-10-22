import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import { useQuery, useMutation } from '@apollo/client';
import { Typography } from '@material-ui/core';

import { LeagueTeam } from '../../types/team';
import {
  UPDATE_LEAGUE,
  UpdateLeagueResult,
  UpdateLeagueInput,
} from '../../graphql/league/update_league.mutation';
import {
  GET_TEAMS,
  TeamsQueryData,
  TeamsQueryVariable,
} from '../../graphql/teams/get_teams.query';
import { parseError } from '../../graphql/client';
import { Table } from '../table/Table';
import { Button } from '../button/Button';
import { LeagueContext } from '../../context/league';

import { AddLeagueTeamModal } from './modals/AddLeagueTeamModal';
import { AddLeaguePlayersModal } from './modals/AddLeaguePlayersModal';

const tableColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Age', field: 'teamAgeType' },
  { title: 'Played', field: 'played' },
  { title: 'Gs', field: 'goalScored' },
  { title: 'GCs ', field: 'goalConceded' },
  { title: 'Win', field: 'win' },
  { title: 'Loss', field: 'loss' },
  { title: 'Tie', field: 'tie' },
  { title: 'Created at', field: 'createdAt' },
];

enum MODAL_TYPE {
  CREATE_TEAM = 'CREATE_TEAM',
  ADD_PLAYERS = 'ADD_PLAYERS',
}

/**
 * Show and allow update to teams associated with league.
 */
const UnstyledLeagueTeams: FunctionComponent = () => {
  const { league: origLeague, setLeague: setOrigLeague } = useContext(
    LeagueContext
  );

  const [leagueTeams, setLeagueTeams] = useState<LeagueTeam[]>(
    origLeague.leagueTeams
  );

  const [selectedTeam, setSelectedTeam] = useState<LeagueTeam>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState<MODAL_TYPE | null>(null);

  // Get all teams.
  const teamQuery = useQuery<TeamsQueryData, TeamsQueryVariable>(GET_TEAMS, {
    variables: { leagueAgeType: origLeague.leagueAgeType },
  });

  // Update team.
  const [updateLeagueMutation] = useMutation<
    UpdateLeagueResult,
    UpdateLeagueInput
  >(UPDATE_LEAGUE);
  useEffect(() => setLeagueTeams(origLeague.leagueTeams), [origLeague]);

  /**
   * Update league
   * @param updateLeague
   */
  const updateLeague = useCallback(
    async (newTeams) => {
      setLoading(true);

      try {
        const res = await updateLeagueMutation({
          variables: {
            league: origLeague,
            newTeams: newTeams,
          },
        });

        if (res.data) {
          setOrigLeague(res.data.updateLeague);
          setOpenModal(null);
        }
      } catch (e) {
        setError(parseError(e));
      }
    },
    [origLeague, updateLeagueMutation]
  );

  if (!teamQuery?.data) {
    return <Box>Loading</Box>;
  }

  return (
    <>
      {/* Create new teams */}
      {openModal === MODAL_TYPE.CREATE_TEAM && (
        <AddLeagueTeamModal
          open={openModal === MODAL_TYPE.CREATE_TEAM}
          age={origLeague.leagueAgeType}
          teams={teamQuery.data.getTeams}
          leagueTeams={leagueTeams}
          onClose={() => setOpenModal(null)}
          updateLeague={(newTeams) => {
            void updateLeague(newTeams);
          }}
        />
      )}

      {/* Adding players to league team */}
      {openModal === MODAL_TYPE.ADD_PLAYERS && selectedTeam && (
        <AddLeaguePlayersModal
          fullScreen={true}
          selectedTeamId={selectedTeam.id}
          open={openModal === MODAL_TYPE.ADD_PLAYERS}
          onClose={() => setOpenModal(null)}
        />
      )}

      <Box>
        <Typography>
          Clubs - Click club to add active players for the league.
        </Typography>
        <Box my={3}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(MODAL_TYPE.CREATE_TEAM)}
            color="secondary"
          >
            Add Clubs
          </Button>
        </Box>

        <Table
          title="Clubs registered"
          columns={tableColumns}
          data={leagueTeams}
          onRowClick={(evt, data) => {
            if (data?.id) {
              setSelectedTeam(data);
              setOpenModal(MODAL_TYPE.ADD_PLAYERS);
            }
          }}
          options={{
            pageSize: 10,
          }}
        />
      </Box>
    </>
  );
};

export const LeagueTeams = withTheme(styled(UnstyledLeagueTeams)``);
