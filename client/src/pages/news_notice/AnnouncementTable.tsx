import React, { FunctionComponent, useState, useEffect } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { scroller } from 'react-scroll';
import map from 'lodash/map';
import { useHistory } from 'react-router';

import { Table } from '../../components/table/Table';
import { Announcement } from '../../types/announcement';

import { AnnouncmentDetail } from './AnnouncmentDetail';

interface AnnouncementProps {
  className?: string;
  announcements?: Announcement[];
  id: string;
}

const tableColumns = [
  { title: 'Title', field: 'title' },
  { title: 'Date Posted', field: 'createdAt' },
];

/**
 * Announcement Table Component.
 */
const UnstyledAnnouncementsTable: FunctionComponent<AnnouncementProps> = ({
  className,
  announcements,
  id,
}) => {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement>();

  const history = useHistory();

  useEffect(() => {
    if (id) {
      map(announcements, (announcement) => {
        if (announcement.id === id) {
          setSelectedAnnouncement(announcement);
        }
      });
    }
  }, [id]);

  if (!announcements) {
    return <div>loading...</div>;
  }

  return (
    <Box>
      {selectedAnnouncement && (
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

export const AnnouncementsTable = withTheme(
  styled(UnstyledAnnouncementsTable)``
);
