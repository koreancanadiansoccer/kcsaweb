/**
 *! Gallery Page on admin side to upload images
 */

import React, { FunctionComponent, useState } from "react";
import { withTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client"; //TODO: useQuery 쓰기

import { GalleryInput } from '../../../types/gallery';
import { AddGalleryModal } from "../../../components/admin_gallery/AddGallery"
import {
  ADD_GALLERY,
  GalleryData,
  AddGalleryDataInput,
} from "../../../graphql/gallery/add.gallery.mutation";
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
>(ADD_GALLERY);

  const createLeague = async (newGallery: GalleryInput) => {
    console.log('create gallery');
    try {
      const res = await createGalleryMut({
        variables: {
          title: newGallery.title,
          content: newGallery.content,
          showOnHomepage: newGallery.showOnHomepage as boolean
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
        onAdd={(newGallery) => createLeague(newGallery)} // Add되면서 check 하도록 만들기
      />

      <h3>Gallery</h3>
      <Button startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
        Create New Gallery
      </Button>
    </>
  );
};

export const Gallery = withTheme(styled(UnstyledGallery)``);
