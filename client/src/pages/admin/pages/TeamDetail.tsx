import React, { FunctionComponent, useMemo, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { Team } from '../../../types/team';
import { Tabs, PanelOptions } from '../../../components/tabs/Tabs';
import { TeamGeneral } from '../../../components/admin_teams/TeamGeneral';
import { TeamPlayers } from '../../../components/admin_teams/TeamPlayers';
import {
  GET_TEAM,
  TeamQueryData,
  TeamQueryVariable,
} from '../../../graphql/teams/get_team.query';
import { parseError } from '../../../graphql/client';
import { TeamContext } from '../../../context/team';

interface TeamDetailProps {
  className?: string;
}

/**
 * Display all info about a team.
 * Uses tab views.
 */
export const UnstyledTeamDetail: FunctionComponent<TeamDetailProps> = ({
  className,
}) => {
  const [team, setTeam] = useState<Team>();

  const { id } = useParams<{ id: string }>();
  const [tabSelected, setTabSelected] = React.useState(0);

  // Get all teams.
  const teamQuery = useQuery<TeamQueryData, TeamQueryVariable>(GET_TEAM, {
    variables: { id },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pull team data.
  useEffect(() => {
    setLoading(teamQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && teamQuery?.data?.getTeam) {
      setTeam(teamQuery.data.getTeam);
    }

    if (teamQuery.error) {
      setError(parseError(teamQuery.error));
    }
  }, [teamQuery, loading, error]);

  // Tabs Panel
  const panelOptions: PanelOptions[] = useMemo(
    () => [
      {
        label: 'General',
        comp: <TeamGeneral />,
      },
      {
        label: 'Players',
        comp: <TeamPlayers />,
      },
    ],
    [team]
  );

  if (!team) {
    return <Box>Loading</Box>;
  }

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      <Box className={className}>
        <>
          <Typography component={'div'} variant="h5">
            {team?.name}
          </Typography>
          <Chip label={`${team?.teamAgeType} AGE`} />
          {/* TODO: Display captains */}

          <Box mt={5}>
            <Tabs
              value={tabSelected}
              setValue={(value: number) => setTabSelected(value)}
              panelOptions={panelOptions}
            />
          </Box>
        </>
      </Box>
    </TeamContext.Provider>
  );
};

export const TeamDetail = withTheme(styled(UnstyledTeamDetail)`
  .MuiTabs-root {
    background-color: white;
  }

  .MuiTabs-indicator {
    height: 0.25rem;
  }
`);
