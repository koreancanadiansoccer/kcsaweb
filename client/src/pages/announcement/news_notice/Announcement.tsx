import React, { FunctionComponent, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/client';
import { useParams, useHistory } from 'react-router';
import find from 'lodash/find';
import { scroller } from 'react-scroll';

import { Table } from '../../../components/table/Table';
import { Announcement } from '../../../types/announcement';
import { GET_ANNOUNCEMENTS } from '../../../graphql/announcement/get_announcements.query';
import { parseError } from '../../../graphql/client';

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
export const Announcements: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>();
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement>();

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  // Get Announcement data.
  const announcementDataQuery = useQuery(GET_ANNOUNCEMENTS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pull announcement data.
  useEffect(() => {
    setLoading(announcementDataQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && announcementDataQuery?.data?.getAnnouncements) {
      setAnnouncements(announcementDataQuery.data.getAnnouncements);
      {
        id
          ? setSelectedAnnouncement(
              find(
                announcementDataQuery.data.getAnnouncements,
                (announcement) => announcement.id === id
              )
            )
          : setSelectedAnnouncement({
              id: '',
              title: '',
              subtitle: '',
              content: '',
              imageURL: '',
              showOnHomepage: false,
            });
      }
    }

    if (announcementDataQuery.error) {
      setError(parseError(announcementDataQuery.error));
    }
  }, [announcementDataQuery, loading, error, id]);

  if (!announcements) {
    return <div>loading...</div>;
  }

  return (
    <Box className={className} my={5}>
      {selectedAnnouncement && selectedAnnouncement?.id != '' && (
        <AnnouncmentDetail
          imgSrc={selectedAnnouncement.imageURL}
          title={selectedAnnouncement.title}
          contentToDisplay={selectedAnnouncement.content}
        />
      )}
      <Box
        className={className}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Table
          style={{ width: 1250 }}
          title="Announcement Info"
          columns={tableColumns}
          data={announcements}
          onRowClick={(evt, data) => {
            setSelectedAnnouncement(data);
            history.push(`/announcement/${data?.id}`);
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
