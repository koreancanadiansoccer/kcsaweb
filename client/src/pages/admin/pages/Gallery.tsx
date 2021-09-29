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
import { AddGalleryModal } from "../../../components/admin_gallery/AddGallery"
import {
  ADD_GALLERY,
  GalleryData,
  AddGalleryDataInput,
} from "../../../graphql/gallery/add.gallery.mutation";
import { parseError } from "../../../graphql/client";
import { Redirect } from "react-router-dom";

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
>(ADD_GALLERY);

  const createGallery = async (newGallery: GalleryInput) => {
    console.log('create gallery');
    try {
      const res = await createGalleryMut({
        variables: {
          title: newGallery.title,
          description: newGallery.description,
          showOnHomepage: newGallery.showOnHomepage as boolean,
        },
      });

      console.log('result!');
      console.log(res);
    } catch (e) {
      const error = parseError(e);
      console.log('erro');
      console.log(error);
    }
  };

  return (
    <>
      <AddGalleryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newGallery: GalleryInput) => {
          createGallery(newGallery);
          setOpenModal(false)
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
