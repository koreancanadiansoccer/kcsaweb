import React, { FunctionComponent, useEffect, useState, useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client";
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
import { GET_LEAGUE } from "../../../graphql/league/get_league.query";
import { parseError } from "../../../graphql/client";
import { LeagueTeams } from "../../../components/admin_league/LeagueTeams";
import { LeagueGeneral } from "../../../components/admin_league/LeagueGeneral";

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
  const [league, setLeague] = useState<League>();

  // Get League data.
  const leagueDataQuery = useQuery(GET_LEAGUE, { variables: { id } });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  const updateLeague = (updateLeague: League) => {};

  return (
    <Box className={className}>
      {!league ||
        (leagueDataQuery.loading && (
          <Backdrop open={loading} style={{ color: "white", zIndex: 1500 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ))}

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
                  updateLeague(updatedLeague)
                }
              />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <LeagueTeams league={league} />
            </TabPanel>

            <TabPanel value={value} index={2}>
              Item Three
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
