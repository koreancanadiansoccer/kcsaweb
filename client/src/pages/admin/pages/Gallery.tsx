/**
 *! Gallery Page on admin side to upload images
 */

import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import { withTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { Button } from '../../../components/button/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { map } from 'lodash';
import { Table } from '../../../components/table/Table';

import { Gallery, GalleryInput } from '../../../types/gallery';
import { CreateGalleryModal } from '../../../components/admin_gallery/AddGallery';
import {
  CREATE_GALLERY,
} from "../../../graphql/gallery/create.gallery.mutation";
import { parseError } from "../../../graphql/client";
import { GET_GALLERIES } from "../../../graphql/gallery/get_galleries.query"
interface GalleryProps {
  className?: string;
}

const tableColumns = [
  { title: 'Title', field: 'title' },
  { title: 'Subtitle', field: 'subTitle' },
  { title: 'Show On Homepage', field: 'showOnHomepage' },
  { title: 'Created', field: 'createdAt' },
];

/**
 * Main Gallery page.
 */
const UnstyledGallery: FunctionComponent<GalleryProps> = ({ className }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [galleries, setGalleries] = useState<Gallery[]>();

  // Get Galleries data
  const galleriesQuery = useQuery(GET_GALLERIES);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const [createGalleryMut] = useMutation<{ createGallery: Gallery[] }, GalleryInput>(CREATE_GALLERY);

  // Pull gallery data.
  useEffect(() => {
    setLoading(galleriesQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && galleriesQuery?.data?.getGalleries) {
      setGalleries(galleriesQuery.data.getGalleries);
    }

    if (galleriesQuery.error) {
      setError(parseError(galleriesQuery.error));
    }
  }, [galleriesQuery, loading, error]);

  const createGallery = async (newGallery: GalleryInput) => {
    try {
      const res = await createGalleryMut({
        variables: {
          title: newGallery.title,
          subTitle: newGallery.subTitle,
          showOnHomepage: newGallery.showOnHomepage as boolean,
        },
      });

      if (res.data) {
        setGalleries(res.data.createGallery);
        setOpenModal(false);
      }
    } catch (e) {
      setError(parseError(e));
    }
  };

  /**
   * Set table data.
   */
  const tableData: Gallery[] = useMemo(() => {
    return map(galleries, (gallery) => {
      return { ...gallery };
    });
  }, [galleries]);

  return (
    <>
      <CreateGalleryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newGallery: GalleryInput) => {
          createGallery(newGallery);
        }}
      />

      <Box>
        <Typography variant="h4">Gallery</Typography>

        <Box my={3}>
          <Button startIcon={<AddIcon />} onClick={() => setOpenModal(true)} color="secondary">
            Create New Gallery
          </Button>
        </Box>

        <Table
          title="Gallery List"
          columns={tableColumns}
          data={tableData}
          onRowClick={(evt, data) => {
            if (data?.id) {
              history.push(`/admin/gallery/${data.id}`);
            }
          }}
          options={{
            pageSize: 10,
            rowStyle: (data) => {
              return data.isActive ? { background: 'white' } : { background: '#EEEEEE' };
            },
          }}
        />
      </Box>
    </>
  );
};

export const Galleries = withTheme(styled(UnstyledGallery)``);
