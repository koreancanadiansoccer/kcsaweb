import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { useMutation, useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import forEach from 'lodash/forEach';
import orderBy from 'lodash/orderBy';

import { Button } from '../../components/button/Button';
import { Gallery, GalleryInput } from '../../types/gallery';
import { CreateGalleryModal } from '../components/admin_gallery/CreateGallery';
import { CREATE_GALLERY } from '../../graphql/gallery/create.gallery.mutation';
import { parseError } from '../../graphql/client';
import { GET_GALLERIES } from '../../graphql/gallery/get_galleries.query';
import {
  UPDATE_GALLERY,
  UpdateShowGalleryInput,
  UpdateShowGalleryResult,
} from '../../graphql/gallery/update_gallery.mutation';
import { GalleryTable } from '../components/admin_gallery/GalleryTable';

interface GalleryProps {
  className?: string;
}

/**
 * Main Gallery page.
 * Displays table of all Galleries
 */
const UnstyledGallery: FunctionComponent<GalleryProps> = ({ className }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [galleries, setGalleries] = useState<Gallery[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get Galleries data
  const galleriesQuery = useQuery(GET_GALLERIES);

  // Create Gallery data
  const [createGalleryMut] = useMutation<
    { createGallery: Gallery[] },
    GalleryInput
  >(CREATE_GALLERY);

  // Update Gallery data
  const [updateGalleryMut] = useMutation<
    UpdateShowGalleryResult,
    UpdateShowGalleryInput
  >(UPDATE_GALLERY);

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

  const updateGallery = useCallback(
    async (changedGallery: UpdateShowGalleryInput, checked: boolean) => {
      try {
        const res = await updateGalleryMut({
          variables: {
            id: changedGallery.id,
            showOnHomepage: checked as boolean,
          },
        });

        if (res.data) {
          setGalleries(res.data.updateGallery);
        }
      } catch (e) {
        setError(parseError(e));
      }
    },
    [updateGalleryMut]
  );

  // Count the number of showOnHomePage when galleries is changed
  const showOnHomepageCount = useMemo(() => {
    let count = 0;
    forEach(galleries, (gallery) => {
      if (gallery.showOnHomepage) count += 1;
    });
    return count;
  }, [galleries]);

  if (!galleries) {
    return <div>loading...</div>;
  }

  return (
    <div className={className}>
      <CreateGalleryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={(newGallery: GalleryInput) => {
          createGallery(newGallery);
        }}
        showOnHomepageCount={showOnHomepageCount}
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

        <GalleryTable
          galleryData={orderBy(galleries, ['showOnHomepage'], ['desc'])}
          showOnHomepageCount={showOnHomepageCount}
          onChange={(
            chnagedGallery: UpdateShowGalleryInput,
            checked: boolean
          ) => {
            updateGallery(chnagedGallery, checked);
          }}
        />
      </Box>
    </div>
  );
};

export const Galleries = withTheme(styled(UnstyledGallery)`
  .table-form {
    margin-left: 2.5rem;

    .MuiIconButton-colorPrimary:hover {
      color: #f17f42;
    }
  }
`);
