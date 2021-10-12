import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import map from 'lodash/map';
import { scroller } from 'react-scroll';
import { useLocation } from 'react-router-dom';

import { Table } from '../../components/table/Table';
import { Announcement } from '../../types/announcement';
import { GET_ANNOUNCEMENTS } from '../../graphql/announcement/get_announcements.query';
import { parseError } from '../../graphql/client';

import { AnnouncmentDetail } from './AnnouncmentDetail';

interface AnnouncementProps {
  className?: string;
}

const tableColumns = [
  { title: 'Title', field: 'title' },
  { title: 'Date Posted', field: 'createdAt' },
];

/**
 * Announcement Page.
 */
const UnstyledAnnouncements: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>();
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement>();

  // Get Announcement data.
  const announcementDataQuery = useQuery(GET_ANNOUNCEMENTS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();

  // Pull announcement data.
  useEffect(() => {
    setLoading(announcementDataQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && announcementDataQuery?.data?.getAnnouncements) {
      setAnnouncements(announcementDataQuery.data.getAnnouncements);
      {
        location.state &&
          setSelectedAnnouncement(
            announcementDataQuery.data.getAnnouncements.filter(
              (announcement: Announcement) => announcement.id === location.state
            )[0]
          );
      }
    }

    if (announcementDataQuery.error) {
      setError(parseError(announcementDataQuery.error));
    }
  }, [announcementDataQuery, loading, error]);

  const tableData: Announcement[] = useMemo(() => {
    return map(announcements, (announcement) => {
      return {
        ...announcement,
      };
    });
  }, [announcements]);

  return (
    <Box my={5}>
      {selectedAnnouncement && (
        <AnnouncmentDetail
          imgSrc={selectedAnnouncement.imageURL}
          title={selectedAnnouncement.title}
          contentToDisplay={selectedAnnouncement.content}
        />
      )}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Table
          style={{ width: 1250 }}
          title="Announcement Info"
          columns={tableColumns}
          data={tableData}
          onRowClick={(evt, data) => {
            setSelectedAnnouncement(data);
            scroller.scrollTo('selectedAnnouncement', {
              smooth: false,
              offset: -150,
              duration: 500,
            });
          }}
          options={{
            pageSize: 10,
          }}
        />
      </Box>
    </Box>
  );
};

export const Announcements = withTheme(styled(UnstyledAnnouncements)``);
