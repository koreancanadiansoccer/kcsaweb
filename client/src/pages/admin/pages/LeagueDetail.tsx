import React, { FunctionComponent, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Chip from "@material-ui/core/Chip";
import Tab from "@material-ui/core/Tab";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useParams } from "react-router";

import { League } from "../../../types/league";
import { Team } from "../../../types/team";
import { GET_LEAGUE } from "../../../graphql/league/get_league.query";
import {
  UPDATE_LEAGUE,
  UpdateLeagueResult,
  UpdateLeagueInput,
} from "../../../graphql/league/update_league.mutation";
import { parseError } from "../../../graphql/client";
import { LeagueTeams } from "../../../components/admin_league/LeagueTeams";
import { LeagueGeneral } from "../../../components/admin_league/LeagueGeneral";
import { LeagueMatch } from "../../../components/admin_league/LeagueMatch";
import { Loader } from "../../../components/loader/Loader";

interface LeagueDetailProps {
  className?: string;
}

interface TabPanelProps {
  value: number;
  index: number;
}

const TabPanel: FunctionComponent<TabPanelProps> = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const UnstyledLeagueDetail: FunctionComponent<LeagueDetailProps> = ({
  className,
}) => {
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = React.useState(0);
  // TODO: Use context.
  const [league, setLeague] = useState<League>();

  // Get League data.
  const leagueDataQuery = useQuery(GET_LEAGUE, { variables: { id } });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  const updateLeague = async (newTeams?: Team[]) => {
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
  };

  return (
    <Box className={className}>
      {!league || (leagueDataQuery.loading && <Loader open={loading} />)}

      {league && (
        <>
          <Typography component={"div"} variant="h5">
            {league?.name}
          </Typography>

          <Chip label={`${league.leagueAgeType} AGE`} />
          <Chip label={league.leagueType} />

          <Box mt={5}>
            <AppBar position="static">
              <Tabs
                textColor="primary"
                value={value}
                onChange={(e, newValue) => {
                  setValue(newValue);
                }}
                aria-label="simple tabs example"
              >
                <Tab label="General" />
                <Tab label="Teams" />
                <Tab label="Match" />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              <LeagueGeneral
                league={league}
                updateLeague={(updatedLeague: League) =>
                  // updateLeague(updatedLeague)
                  // TODO: Temporal update to call mutation
                  console.log("league general")
                }
              />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <LeagueTeams
                league={league}
                updateLeague={(newLeagueTeams: Team[]) => {
                  updateLeague(newLeagueTeams);
                }}
              />
            </TabPanel>

            <TabPanel value={value} index={2}>
              Item Three
              <LeagueMatch
                league={league}
                updateLeague={(updatedLeague: League) =>
                  // updateLeague(updatedLeague)
                  // TODO: Temporal update to call mutation
                  console.log("league general")
                }
              />
            </TabPanel>
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
