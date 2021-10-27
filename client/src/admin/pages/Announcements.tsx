import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { useQuery, useMutation } from '@apollo/client';
import Box from '@material-ui/core/Box';
import { useRouteMatch, Link as RouteLink } from 'react-router-dom';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import { Button } from '../../components/button/Button';
import { parseError } from '../../graphql/client';
import { Announcement, AnnouncementInput } from '../../types/announcement';
import { GET_ANNOUNCEMENTS } from '../../graphql/announcement/get_announcements.query';
import { CreateAnnouncement } from '../components/admin_announcement/CreateAnnouncement';
import { CREATE_ANNOUNCEMENT } from '../../graphql/announcement/create_announcement.mutation';
import { AnnouncementTable } from '../components/admin_announcement/AnnouncementTable';
import {
  UPDATE_ANNOUNCEMENT,
  UpdateShowAnnouncementInput,
  UpdateShowAnnouncementResult
} from '../../graphql/announcement/update_announcement.mutation'

/**
 * Announcement page.
 */
export const Announcements: FunctionComponent = () => {
  const { url } = useRouteMatch();

  const [announcements, setAnnouncements] = useState<Announcement[]>();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get Announcement data.
  const announcementDataQuery = useQuery(GET_ANNOUNCEMENTS);

  // Create Announcement data.
  const [createAnnouncementMut] = useMutation<
    { createAnnouncement: Announcement[] },
    AnnouncementInput
  >(CREATE_ANNOUNCEMENT);

  // Update Announcement data.
  const [updateAnnouncementMut] = useMutation<
    UpdateShowAnnouncementResult,
    UpdateShowAnnouncementInput
  >(UPDATE_ANNOUNCEMENT);

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

  const updateAnnouncement = useCallback(
    async (
      changedAnnouncement: UpdateShowAnnouncementInput,
      checked: boolean
    ) => {
      try {
        const res = await updateAnnouncementMut({
          variables: {
            id: changedAnnouncement.id,
            showOnHomepage: checked as boolean,
          },
        });

        if (res.data) {
          setAnnouncements(res.data.updateAnnouncement);
        }
      } catch (e) {
        setError(parseError(e));
      }
    },
    [updateAnnouncementMut]
  );

  const updateButtonStatus = useCallback(() => {
    setButtonClicked(true);
  }, [buttonClicked]);

  // Count the number of showOnHomePage when announcements is changed
  const showOnHomepageCount = useMemo(() => {
    let count = 0;
    map(announcements, (announcement) => {
      announcement.showOnHomepage ? (count += 1) : count;
    });
    return count;
  }, [announcements]);

  if (!announcements) {
    return <div>loading...</div>;
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
          showOnHomepageCount={showOnHomepageCount}
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

          <AnnouncementTable
            announcementData={orderBy(
              announcements,
              ['showOnHomepage'],
              ['desc']
            )}
            showOnHomePageCount={showOnHomepageCount}
            onChange={(
              chnagedAnnouncement: UpdateShowAnnouncementInput,
              checked: boolean
            ) => {
              updateAnnouncement(chnagedAnnouncement, checked);
            }}
          />
        </Box>
      )}
    </>
  );
};
