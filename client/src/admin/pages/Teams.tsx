import React, { FunctionComponent, useEffect, useState, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { map } from 'lodash';

import { CREATE_TEAM } from '../../graphql/teams/create_team.mutation';
import {
  GET_TEAMS,
  TeamsQueryData,
  TeamsQueryVariable,
} from '../../graphql/teams/get_teams.query';
import { parseError } from '../../graphql/client';
import { Table } from '../../components/table/Table';
import { Button } from '../../components/button/Button';
import { CreateTeamModal } from '../components/admin_teams/modals/CreateTeamModal';
import { Team, TeamInput } from '../../types/team';

// Table columns to show.
const tableColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Age Group', field: 'teamAgeType' },
  { title: 'isActive', field: 'isActive' },
  { title: 'Created', field: 'createdAt' },
];

/**
 * Displays table of all leagues.
 */
export const Teams: FunctionComponent = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>();

  // Get Teams data.
  const teamsQuery = useQuery<TeamsQueryData, TeamsQueryVariable>(GET_TEAMS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const [createTeamMut] = useMutation<{ createTeam: Team[] }, TeamInput>(
    CREATE_TEAM
  );

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

  const createTeam = async (newTeam: TeamInput) => {
    setLoading(true);

    try {
      const res = await createTeamMut({
        variables: {
          name: newTeam.name,
          teamAgeType: newTeam.teamAgeType,
          teamColor: newTeam.teamColor,
        },
      });

      if (res.data) {
        setTeams(res.data.createTeam);
        setOpenModal(false);
      }
    } catch (e) {
      setError(parseError(e));
    }
  };

  /**
   * Set table data.
   */
  const tableData: Team[] = useMemo(() => {
    return map(teams, (team) => {
      return { ...team };
    });
  }, [teams]);

  return (
    <>
      <CreateTeamModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newTeam) => createTeam(newTeam)}
      />

      <Box>
        <Typography variant="h4">Clubs</Typography>

        <Box my={3}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            color="secondary"
          >
            Create New Club
          </Button>
        </Box>

        <Table
          title="Club list"
          columns={tableColumns}
          data={tableData}
          onRowClick={(evt, data) => {
            if (data?.id) {
              history.push(`/admin/clubs/${data.id}`);
            }
          }}
          options={{
            pageSize: 10,
            rowStyle: (data) => {
              return data.isActive
                ? { background: 'white' }
                : { background: '#EEEEEE' };
            },
          }}
        />
      </Box>
    </>
  );
};
