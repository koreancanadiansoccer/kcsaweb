import React, { FunctionComponent, useState, useEffect } from "react";

import styled from "styled-components";
import { parseError } from "../../graphql/client";
import { useParams } from "react-router";

import { useQuery } from "@apollo/client";

import ReactHtmlParser, {
  convertNodeToElement,
  processNodes,
} from "react-html-parser";

import {
  GET_ANNOUNCEMENT,
  AnnouncementQueryData,
  AnnouncementQueryVariable,
} from "../../graphql/announcement/get_announcement.query";

import { Announcement } from "../../types/announcement";
import {
  Typography,
  withTheme,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Grid,
  TablePagination,
  TableFooter,
} from "@material-ui/core";

interface AnnouncementProps {
  className?: string;
}

const UnstyledSelectedAnnouncement: FunctionComponent<AnnouncementProps> = (
  className
) => {
  const { id } = useParams<{ id: string }>();

  const announcementQuery = useQuery<
    AnnouncementQueryData,
    AnnouncementQueryVariable
  >(GET_ANNOUNCEMENT, {
    variables: { id },
  });

  const [announcement, setAnnouncement] = useState<Announcement>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(announcementQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && announcementQuery?.data?.getAnnouncement) {
      setAnnouncement(announcementQuery.data.getAnnouncement);
    }

    if (announcementQuery.error) {
      setError(parseError(announcementQuery.error));
    }
  }, [announcementQuery, loading, error]);

  const contentToDisplay = announcement?.content as string;

  return (
    <>
      <Box mt={5} display="flex" justifyContent="center" alignItems="center">
        <Paper style={{ width: 1250 }} className="announcement-paper">
          <Box my={5} mx={5}>
            <Box>
              <Typography variant="h4">{announcement?.title}</Typography>
            </Box>

            <Box mt={5}>{ReactHtmlParser(contentToDisplay)}</Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export const SelectedAnnouncement = withTheme(
  styled(UnstyledSelectedAnnouncement)`
    .announcement-paper {
      width: 100%;
      padding: 2rem 1.5rem;
      border: 2px solid rgba(142, 142, 147, 0.4);
    }
  `
);
