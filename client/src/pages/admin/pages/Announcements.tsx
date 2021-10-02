import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { map } from "lodash";

import {
  Switch,
  Route,
  useRouteMatch,
  Link as RouteLink,
} from "react-router-dom";

import { Button } from "../../../components/button/Button";
import { Table } from "../../../components/table/Table";

import { AddAnnouncement } from "../../../components/admin_announcement/AddAnnouncement";
import { CREATE_ANNOUNCEMENT } from "../../../graphql/announcement/create_announcement.mutation";
import { parseError } from "../../../graphql/client";
import { AnnouncementInput } from "../../../types/announcement";
import { Announcement } from "../../../types/announcement";
import { GET_ANNOUNCEMENTS } from "../../../graphql/announcement/get_announcements.query";

interface AnnouncementProps {
  className?: string;
}

const tableColumns = [
  { title: "Title", field: "title" },
  { title: "Subtitle", field: "subtitle" },
  { title: "Content", field: "content" },
  { title: "Show On Homepage", field: "showOnHomepage" },
  { title: "Created", field: "createdAt" },
];

/**
 * Main home page.
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

  const [createAnnouncementMut] = useMutation<
    { createAnnouncement: Announcement[] },
    AnnouncementInput
  >(CREATE_ANNOUNCEMENT);

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

  const createAnnouncement = async (newAnnouncement: AnnouncementInput) => {
    setLoading(true);

    try {
      const res = await createAnnouncementMut({
        variables: {
          title: newAnnouncement.title,
          subtitle: newAnnouncement.subtitle,
          content: newAnnouncement.content,
          showOnHomepage: newAnnouncement.showOnHomepage,
        },
      });
      if (res.data) {
        setAnnouncements(res.data.createAnnouncement);
      }
    } catch (e) {
      setError(parseError(e));
    }
  };

  /**
   * Set table data.
   */
  const tableData: Announcement[] = useMemo(() => {
    return map(announcements, (announcement) => {
      return {
        ...announcement,
        imagesCount: announcement.images?.length,
      };
    });
  }, [announcements]);

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Box>
            <Typography variant="h4">Announcement</Typography>

            <Box my={3}>
              <Button
                component={RouteLink}
                to={`${url}/create_announcement`}
                startIcon={<AddIcon />}
                color="secondary"
                onClick={() => {}}
              >
                Create New Announcement
              </Button>
            </Box>

            <Table
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
        </Route>

        <Route path={`${url}/create_announcement`}>
          <AddAnnouncement
            className="announcement-form"
            onAdd={(newAnnouncement: AnnouncementInput) => {
              createAnnouncement(newAnnouncement);
            }}
          />
        </Route>
      </Switch>
    </>
  );
};

export const Announcements = withTheme(styled(UnstyledAnnouncements)``);
