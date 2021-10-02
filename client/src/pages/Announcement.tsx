import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { map } from "lodash";

import {
  Switch,
  Route,
  useRouteMatch,
  Link as RouteLink,
} from "react-router-dom";

import { Table } from "../components/table/Table";
import { Announcement } from "../types/announcement";
import { GET_ANNOUNCEMENTS } from "../graphql/announcement/get_announcements.query";
import { parseError } from "../graphql/client";

interface AnnouncementProps {
  className?: string;
}

const tableColumns = [
  { title: "Title", field: "title" },
  { title: "Date Posted", field: "createdAt" },
];

/**
 * About Page.
 */
const UnstyledAnnouncements: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {
  const { path, url } = useRouteMatch();
  const [announcements, setAnnouncements] = useState<Announcement[]>();

  // Get Announcement data.
  const announcementDataQuery = useQuery(GET_ANNOUNCEMENTS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  // Pull announcement data.
  useEffect(() => {
    setLoading(announcementDataQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && announcementDataQuery?.data?.getAnnouncements) {
      setAnnouncements(announcementDataQuery.data.getAnnouncements);
    }

    if (announcementDataQuery.error) {
      setError(parseError(announcementDataQuery.error));
    }
  }, [announcementDataQuery, loading, error]);

  const tableData: Announcement[] = useMemo(() => {
    return map(announcements, (announcement) => {
      return {
        ...announcement,
        imagesCount: announcement.images?.length,
      };
    });
  }, [announcements]);

  return (
    <Switch>
      <Route exact path={path}>
        <Box my={5}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Table
              style={{ width: 1250 }}
              title="Announcement Info"
              columns={tableColumns}
              data={tableData}
              onRowClick={(evt, data) => {
                if (data?.id) {
                  history.push(`/admin/announcement/${data.id}`);
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
          </Box>
        </Box>
      </Route>
    </Switch>
  );
};

export const Announcements = withTheme(styled(UnstyledAnnouncements)``);
