import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";

import styled from "styled-components";
import { useMutation } from "@apollo/client";

import { AddAnnouncement } from "./AddAnnouncement";
import { CREATE_ANNOUNCEMENT } from "../../graphql/announcement/create_announcement.mutation";
import { AnnouncementInput } from "../../types/announcement";
import { Announcement } from "../../types/announcement";

interface AnnouncementProps {
  className?: string;
}

const UnstyledCreateAnnouncements: FunctionComponent<AnnouncementProps> = ({
  className,
}) => {
  const [createAnnouncementMut] = useMutation<
    { createAnnouncement: Announcement[] },
    AnnouncementInput
  >(CREATE_ANNOUNCEMENT);

  const createAnnouncement = async (newAnnouncement: AnnouncementInput) => {
    await createAnnouncementMut({
      variables: {
        title: newAnnouncement.title,
        subtitle: newAnnouncement.subtitle,
        content: newAnnouncement.content,
        showOnHomepage: newAnnouncement.showOnHomepage,
      },
    });
  };

  return (
    <AddAnnouncement
      className="announcement-form"
      onAdd={(newAnnouncement: AnnouncementInput) => {
        createAnnouncement(newAnnouncement);
      }}
    />
  );
};

export const CreateAnnouncements = withTheme(
  styled(UnstyledCreateAnnouncements)``
);
