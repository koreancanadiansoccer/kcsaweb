import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import map from 'lodash/map';

import {
  GET_GALLERIES,
  GalleryQueryData,
} from '../../../graphql/gallery/get_galleries.query';
import { Gallery } from '../../../types/gallery';
import { parseError } from '../../../graphql/client';
import { GalleryCard } from '../../../components/gallery_card/GalleryCard';

interface GalleryProps {
  className?: string;
}

/**
 *  Media Page.
 */
const UnstyledMedia: FunctionComponent<GalleryProps> = ({ className }) => {
  const [galleries, setGalleries] = useState<Gallery[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get Galleries data
  const galleriesQuery = useQuery<GalleryQueryData>(GET_GALLERIES);

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

  if (!galleries) {
    return <div>loading...</div>;
  }

  return (
    <Box className={className}>
      <Box className="init-gallery-page">
        <Box className="gallery-page" mt={3}>
          {map(galleries, (gallery) => (
            <GalleryCard
              className="gallery-card"
              gallery={gallery}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const Media = withTheme(styled(UnstyledMedia)`
  .init-gallery-page {
    display: flex;
    justify-content: center;
  }

  .gallery-page {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    width: 80rem;
  }

  .gallery-card {
    text-align: start;
    width: 20%;
    padding: 18px;
  }
`);
