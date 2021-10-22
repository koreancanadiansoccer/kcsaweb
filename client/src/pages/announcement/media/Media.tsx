import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import map from 'lodash/map';
import Typography from '@material-ui/core/Typography';

import {
  GET_GALLERIES,
  GalleryQueryData,
} from '../../../graphql/gallery/get_galleries.query';
import { Gallery } from '../../../types/gallery';
import { parseError } from '../../../graphql/client';
import { GalleryCard } from '../../../components/gallery_card/GalleryCard';
import AboutBanner from '../../../assets/about.png';
import { Pagination } from '../../../components/pagination/Pagination'

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

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

  const handlePageChange = async (page: number) => {
    setPage(page - 1);
  };

  if (!galleries) {
    return <div>loading...</div>;
  }

  return (
    <Box className={className}>
      <Box
        className="media-banner-container"
        display="flex"
        alignItems="center"
      >
        <Typography variant="h3" className="media-banner-text">
          Gallery
        </Typography>
      </Box>
      <Box className="init-gallery-page">
        <Box className="gallery-page" mt={3}>
          {map(
            galleries.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ),
            (gallery) => (
              <GalleryCard className="gallery-card" gallery={gallery} />
            )
          )}
        </Box>
      </Box>

      <Pagination
        className="pagination"
        activePage={page + 1}
        rowsPerPage={rowsPerPage}
        onChange={(page: number) => {
          handlePageChange(page);
        }}
        imageLength={galleries.length}
      />
    </Box>
  );
};

export const Media = withTheme(styled(UnstyledMedia)`
  .media-banner-container {
    background-image: url(${AboutBanner});
    min-width: 100px; /*or 70%, or what you want*/
    height: 284px; /*or 70%, or what you want*/
    background-size: 100% 100%;
  }

  .media-banner-text {
    font-weight: 700;
    color: white;
    margin-left: 7rem;
  }

  .init-gallery-page {
    display: flex;
    justify-content: center;
    height: fit-content;
  }

  .gallery-page {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    width: 88rem;
    margin-left: 3rem;
  }

  .gallery-card {
    padding: 1.5rem;
    width: 20rem;
    height: 400px;
    margin: 0.6rem;
  }

  .pagination {
    margin-top: 120px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`);
