import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { withTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import Box from '@material-ui/core/Box';
import map from 'lodash/map';
import { useMutation, useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

import { Button } from '../../../components/button/Button';
import { Table } from '../../../components/table/Table';
import { Gallery, GalleryInput } from '../../../types/gallery';
import { AddGalleryModal } from '../../../components/admin_gallery/AddGallery';
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
  { title: 'Description', field: 'description' },
  { title: 'Show On Homepage', field: 'showOnHomepage' },
  { title: 'Created', field: 'createdAt' },
];

/**
 * Main Gallery page.
 * Displays table of all Galleries
 */
const UnstyledGallery: FunctionComponent<GalleryProps> = ({ className }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [galleries, setGalleries] = useState<Gallery[]>();
  const showOnHomePageCount = useRef(0);

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

    if (galleriesQuery?.data?.getGalleries.length == 0) {
      setOpenModal(true);
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
          description: newGallery.description,
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

  // Render page and count the number of showOnHomePage when galleries is not undefined
  if (galleries) {
    showOnHomePageCount.current = 0;
    map(galleries, (gallery) => {
      gallery.showOnHomepage
        ? (showOnHomePageCount.current += 1)
        : showOnHomePageCount.current;
    });
  }
  else {
    return <div>loading...</div>
  }

  return (
    <>
      <AddGalleryModal
        className={className}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newGallery: GalleryInput) => {
          createGallery(newGallery);
        }}
        showOnHomePageCount={showOnHomePageCount.current}
      />

      <Box>
        <Typography variant="h4">Gallery</Typography>

        <Box my={3}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            color="secondary"
          >
            Create New Gallery
          </Button>
        </Box>

        <Table
          title="Gallery List"
          columns={tableColumns}
          data={galleries}
          onRowClick={(evt, data) => {
            if (data?.id) {
              history.push(`/admin/gallery/${data.id}`);
            }
          }}
          options={{
            pageSize: 10,
            rowStyle: (data) => {
              return data.showOnHomepage
                ? { background: 'white' }
                : { background: '#EEEEEE' };
            },
          }}
        />
      </Box>
    </>
  );
};

export const Galleries = withTheme(styled(UnstyledGallery)``);
