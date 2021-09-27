import React, { FunctionComponent, useState, useEffect } from "react";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import Box from "@material-ui/core/Box";

import {
  Switch,
  Route,
  useRouteMatch,
  Link as RouteLink,
} from "react-router-dom";

import { AddAnnouncement } from "../../../components/admin_announcement/AddAnnouncement";
import {
  CREATE_ANNOUNCEMENT,
  CreateAnnouncementDataInput,
  AnnouncementData,
} from "../../../graphql/announcement/create_announcement.mutation";
import { parseError } from "../../../graphql/client";
import { AnnouncementInput } from "../../../types/announcement";

interface AnnouncementProps {
  className?: string;
}

/**
 * Main home page.
 */
const UnstyledAnnouncement: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {
  const { url } = useRouteMatch();

  const [showButton, setShowButton] = useState(true);

  const [createAnnouncementMut, createAnnouncementMutObj] = useMutation<
    CreateAnnouncementDataInput,
    AnnouncementData
  >(CREATE_ANNOUNCEMENT);

  const createAnnouncement = async (newAnnouncement: AnnouncementInput) => {
    console.log("New Announcement Added!");
    try {
      const res = await createAnnouncementMut({
        variables: {
          title: newAnnouncement.title,
          subtitle: newAnnouncement.subtitle,
          content: newAnnouncement.content,
          showOnHomepage: newAnnouncement.showOnHomepage as boolean,
        },
      });
      console.log("result!");
      console.log(res);
    } catch (e) {
      const error = parseError(e);
      console.log("error");
      console.log(error);
    }
  };

  return (
    <>
      {showButton && (
        <Box>
          <h3>Announcement</h3>
          <Button
            component={RouteLink}
            to={`${url}/create_announcement`}
            startIcon={<AddIcon />}
            onClick={() => {
              setShowButton(false);
            }}
          >
            Create New Announcement
          </Button>
        </Box>
      )}

      <Switch>
        <Route path={`${url}/create_announcement`}>
          <AddAnnouncement
            className="announcement-form"
            onAdd={(newAnnouncement: AnnouncementInput) => {
              createAnnouncement(newAnnouncement);
              setShowButton(true);
            }}
          />
        </Route>
      </Switch>
    </>
  );
};

export const Announcement = withTheme(styled(UnstyledAnnouncement)``);
