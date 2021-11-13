import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { withTheme, useTheme } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import map from 'lodash/map';
import dayjs from 'dayjs';
import { scroller } from 'react-scroll';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Announcement } from '../../../types/announcement';
import { GET_ANNOUNCEMENTS } from '../../../graphql/announcement/get_announcements.query';
import { parseError } from '../../../graphql/client';
import AboutBanner from '../../../assets/about.png';

import { AnnouncmentDetail } from './AnnouncmentDetail';
import { AnnouncementTable } from './AnnouncementTable';
interface AnnouncementProps {
  className?: string;
}

/**
 * Announcement Page.
 */
const UnstyledAnnouncements: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [announcements, setAnnouncements] = useState<Announcement[]>();
  const [selectedID, setSelectedID] = useState<string>(id);

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

      id ? setSelectedID(String(announcementDataQuery.data.getAnnouncements.length - parseInt(id))) : setSelectedID('');
    }


    if (announcementDataQuery.error) {
      setError(parseError(announcementDataQuery.error));
    }
  }, [announcementDataQuery, loading, error, id]);

  const selectedAnnouncement = useMemo(() => {
    if (!announcements || !setSelectedID.length) return null;
    return announcements[parseInt(selectedID)];
  }, [selectedID, id, announcements]);

  const tableRowData = useMemo(() => {
    if (!announcements) return null;
    return map(announcements, (announcement, idx) => {
      return {
        'No.': idx + 1 + '.',
        Title: announcement.title,
        Date: isMobile
          ? dayjs(announcement.createdAt, 'YYYY-MM-DDTHH:mm').format(
              'DD-MMM'
            )
          : dayjs(announcement.createdAt, 'YYYY-MM-DDTHH:mm').format(
              'YYYY-MM-DD'
            ),
      };
    })
  }, [announcements]);

  if (!announcements || !tableRowData) {
    return <div>loading...</div>;
  }

  return (
    <Box className={className} mb={6}>
      <Box
        className="news-banner-container"
        display="flex"
        alignItems="center"
        height={isMobile ? '100px' : '240px'}
        id="selectedAnnouncement"
      >
        <Container>
          <Box
            fontSize={isMobile ? 24 : 'h3.fontSize'}
            fontWeight={700}
            color="white"
            ml={isMobile ? 3 : 4}
          >
            Announcement
          </Box>
        </Container>
      </Box>

      <Container>
        {selectedAnnouncement && (
          <AnnouncmentDetail
            announcement={selectedAnnouncement}
            maxLength={announcements.length}
            moveClick={(id: number) => {
              setSelectedID(String(id));
              history.push(`/announcement/${id}`);
              scroller.scrollTo('selectedAnnouncement', {
                smooth: true,
                offset: isMobile ? 110 : 300,
                duration: 500,
              });
            }}
            isMobile={isMobile}
          />
        )}

        <AnnouncementTable
          tableRowData={tableRowData}
          selectedID={selectedID}
          onChange={(id: string) => {
            setSelectedID(id);
          }}
          isMobile={isMobile}
        />
      </Container>
    </Box>
  );
};

export const Announcements = withTheme(styled(UnstyledAnnouncements)`
  .news-banner-container {
    background-image: url(${AboutBanner});
    min-width: 100px; /*or 70%, or what you want*/
    background-size: 100% 100%;
  }
`);
