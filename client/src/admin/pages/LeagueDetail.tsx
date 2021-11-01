import React, { FunctionComponent, useEffect, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { League } from '../../types/league';
import { GET_LEAGUE } from '../../graphql/league/get_league.query';
import { parseError } from '../../graphql/client';
import { LeagueTeams } from '../components/admin_league/LeagueTeams';
import { LeagueGeneral } from '../components/admin_league/LeagueGeneral';
import { LeagueMatch } from '../components/admin_league/LeagueMatch';
import { Loader } from '../../components/loader/Loader';
import { Tabs, PanelOptions } from '../../components/tabs/Tabs';
import { LeagueContext } from '../../context/league';

interface LeagueDetailProps {
  className?: string;
}

/**
 * Display all info about a league.
 * Uses tab views.
 */
export const LeagueDetail: FunctionComponent<LeagueDetailProps> = ({
  className,
}) => {
  const [league, setLeague] = useState<League>();

  const { id } = useParams<{ id: string }>();
  const [tabSelected, setTabSelected] = useState(0);

  // Get League data.
  const leagueDataQuery = useQuery(GET_LEAGUE, {
    variables: { id: parseInt(id, 10) },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  // Tabs Panel
  const panelOptions: PanelOptions[] = useMemo(
    () => [
      {
        label: 'General',
        comp: <LeagueGeneral />,
      },

      {
        label: 'Clubs',
        comp: <LeagueTeams />,
      },

      {
        label: 'Match',
        comp: <LeagueMatch />,
      },
    ],
    [league]
  );

  if (!league) {
    return <Loader open />;
  }

  return (
    <LeagueContext.Provider value={{ league, setLeague }}>
      <Box className={className}>
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
      </Box>
    </LeagueContext.Provider>
  );
};
