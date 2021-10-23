import React, {
  FunctionComponent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { useQuery, useMutation } from '@apollo/client';
import Box from '@material-ui/core/Box';
import { useHistory, useRouteMatch, Link as RouteLink } from 'react-router-dom';
import { map } from 'lodash';

import { Button } from '../../components/button/Button';
import { Table } from '../../components/table/Table';
import { parseError } from '../../graphql/client';
import { Announcement, AnnouncementInput } from '../../types/announcement';
import { GET_ANNOUNCEMENTS } from '../../graphql/announcement/get_announcements.query';
import { CreateAnnouncement } from '../components/admin_announcement/CreateAnnouncement';
import { CREATE_ANNOUNCEMENT } from '../../graphql/announcement/create_announcement.mutation';

// left out the content because it was too long
const tableColumns = [
  { title: 'Title', field: 'title' },
  { title: 'Subtitle', field: 'subtitle' },
  { title: 'Show On Homepage', field: 'showOnHomepage' },
  { title: 'Image URL', field: 'imageURL' },
  { title: 'Created', field: 'createdAt' },
];

/**
 * Announcement page.
 */
export const Announcements: FunctionComponent = () => {
  const { url } = useRouteMatch();

  const [announcements, setAnnouncements] = useState<Announcement[]>();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const showOnHomepageCount = useRef(0);

  const history = useHistory();

  // Get Announcement data.
  const announcementDataQuery = useQuery(GET_ANNOUNCEMENTS);

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

  const [createAnnouncementMut] = useMutation<
    { createAnnouncement: Announcement[] },
    AnnouncementInput
  >(CREATE_ANNOUNCEMENT);

  const createAnnouncement = async (newAnnouncement: AnnouncementInput) => {
    try {
      const res = await createAnnouncementMut({
        variables: {
          title: newAnnouncement.title,
          subtitle: newAnnouncement.subtitle,
          content: newAnnouncement.content,
          imageURL: newAnnouncement.imageURL,
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

  const updateButtonStatus = useCallback(() => {
    setButtonClicked(true);
  }, [buttonClicked]);

  if (!announcements) {
    return <div>loading...</div>;
  } else {
    showOnHomepageCount.current = 0;
    map(announcements, (announcement) => {
      announcement.showOnHomepage
        ? (showOnHomepageCount.current += 1)
        : showOnHomepageCount.current;
    });
  }

  return (
    <>
      {buttonClicked ? (
        <CreateAnnouncement
          onAdd={(newAnnouncement: AnnouncementInput) => {
            createAnnouncement(newAnnouncement);
          }}
          setButtonFalse={(buttonClickedStatus: boolean) => {
            setButtonClicked(buttonClickedStatus);
          }}
          showOnHomepageCount={showOnHomepageCount.current}
        />
      ) : (
        <Box>
          <Typography variant="h4">Announcement</Typography>

          <Box my={3}>
            <Button
              component={RouteLink}
              to={`${url}/createAnnouncement`}
              startIcon={<AddIcon />}
              color="secondary"
              onClick={updateButtonStatus}
            >
              Create New Announcement
            </Button>
          </Box>

          <Table
            title="Announcement Info"
            columns={tableColumns}
            data={announcements}
            onRowClick={(evt, data) => {
              if (data?.id) {
                history.push(`/admin/announcement/${data.id}`);
              }
            }}
            options={{
              pageSize: 10,
              rowStyle: (data) => {
                return data.isActive
                  ? { background: 'white' }
                  : { background: '#EEEEEE' };
              },
            }}
          />
        </Box>
      )}
    </>
  );
};
