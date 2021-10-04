import React, {
  FunctionComponent,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { League } from '../../../types/league';
import { Team } from '../../../types/team';
import { GET_LEAGUE } from '../../../graphql/league/get_league.query';
import {
  UPDATE_LEAGUE,
  UpdateLeagueResult,
  UpdateLeagueInput,
} from '../../../graphql/league/update_league.mutation';
import { parseError } from '../../../graphql/client';
import { LeagueTeams } from '../../../components/admin_league/LeagueTeams';
import { LeagueGeneral } from '../../../components/admin_league/LeagueGeneral';
import { LeagueMatch } from '../../../components/admin_league/LeagueMatch';
import { Loader } from '../../../components/loader/Loader';
import { Tabs, PanelOptions } from '../../../components/tabs/Tabs';

interface LeagueDetailProps {
  className?: string;
}

/**
 * Display all info about a league.
 * Uses tab views.
 */
export const UnstyledLeagueDetail: FunctionComponent<LeagueDetailProps> = ({
  className,
}) => {
  const { id } = useParams<{ id: string }>();
  const [tabSelected, setTabSelected] = React.useState(0);

  // TODO: Use context.
  const [league, setLeague] = useState<League>();

  // Get League data.
  const leagueDataQuery = useQuery(GET_LEAGUE, { variables: { id } });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [updateLeagueMutation] = useMutation<
    UpdateLeagueResult,
    UpdateLeagueInput
  >(UPDATE_LEAGUE);

  // Pull league data.
  useEffect(() => {
    setLoading(leagueDataQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && leagueDataQuery?.data?.getLeague) {
      setLeague(leagueDataQuery.data.getLeague);
    }

    if (leagueDataQuery.error) {
      setError(parseError(leagueDataQuery.error));
    }
  }, [leagueDataQuery, loading, error]);

  /**
   * Update league
   * @param updateLeague
   */
  const updateLeague = useCallback(
    async (newTeams?: Team[]) => {
      setLoading(true);
      try {
        const res = await updateLeagueMutation({
          variables: {
            newTeams: newTeams,
            league: league,
          },
        });
        if (res.data) {
          // setLeagues(res.data.createLeague);
        }
      } catch (e) {
        setError(parseError(e));
      }
    },
    [league, updateLeagueMutation]
  );

  // Tabs Panel
  const panelOptions: PanelOptions[] = useMemo(
    () => [
      {
        label: 'General',
        comp: (
          <LeagueGeneral
            league={league}
            updateLeague={(updatedLeague: League) =>
              // updateLeague(updatedLeague)
              // TODO: Temporal update to call mutation
              console.info('league general')
            }
          />
        ),
      },

      {
        label: 'Teams',
        comp: (
          <LeagueTeams
            league={league}
            updateLeague={(newLeagueTeams: Team[]) => {
              void updateLeague(newLeagueTeams);
            }}
          />
        ),
      },

      {
        label: 'Match',
        comp: (
          <LeagueMatch
            league={league}
            updateLeague={(updatedLeague: League) =>
              // updateLeague(updatedLeague)
              // TODO: Temporal update to call mutation
              console.info('league general')
            }
          />
        ),
      },
    ],
    [league, updateLeague]
  );

  return (
    <Box className={className}>
      {!league || (leagueDataQuery.loading && <Loader open={loading} />)}

      {league && (
        <>
          <Typography component={'div'} variant="h5">
            {league?.name}
          </Typography>

          <Chip label={`${league.leagueAgeType} AGE`} />
          <Chip label={league.leagueType} />

          <Box mt={5}>
            <Tabs
              value={tabSelected}
              setValue={(value: number) => setTabSelected(value)}
              panelOptions={panelOptions}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export const LeagueDetail = withTheme(styled(UnstyledLeagueDetail)`
  .MuiTabs-root {
    background-color: white;
  }

  .MuiTabs-indicator {
    height: 0.25rem;
  }
`);
