/**
 *! Gallery Page on admin side to upload images
 */

import React, { FunctionComponent, useState } from "react";
import { withTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { Button } from '../../../components/button/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useMutation, useQuery } from '@apollo/client'; //TODO: useQuery 쓰기

import { GalleryInput } from '../../../types/gallery';
import { CreateGalleryModal } from '../../../components/admin_gallery/AddGallery';
import {
  CREATE_GALLERY,
  GalleryData,
  AddGalleryDataInput,
} from "../../../graphql/gallery/create.gallery.mutation";
import { parseError } from "../../../graphql/client";
interface GalleryProps {
  className?: string;
}

/**
 * Main Gallery page.
 */
const UnstyledGallery: FunctionComponent<GalleryProps> = ({ className }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [createGalleryMut, createGalleryMutObj] = useMutation<
  GalleryData, AddGalleryDataInput
>(CREATE_GALLERY);

  const createGallery = async (newGallery: GalleryInput) => {
    try {
      const res = await createGalleryMut({
        variables: {
          title: newGallery.title,
          subTitle: newGallery.subTitle,
          showOnHomepage: newGallery.showOnHomepage as boolean,
        },
      });

    } catch (e) {
      const error = parseError(e);
      console.log(error);
    }
  };

  return (
    <>
      <CreateGalleryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newGallery: GalleryInput) => {
          createGallery(newGallery);
          setOpenModal(false);
        }}
        onupload
      />

      <Typography variant="h4">Gallery</Typography>

      <Box my={3}>
        <Button startIcon={<AddIcon />} onClick={() => setOpenModal(true)} color="secondary">
          Create New Gallery
        </Button>
      </Box>
    </>
  );
};

export const Gallery = withTheme(styled(UnstyledGallery)``);
