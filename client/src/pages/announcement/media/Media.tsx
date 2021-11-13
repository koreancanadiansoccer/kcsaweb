import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { withTheme, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import map from 'lodash/map';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  GET_GALLERIES,
  GalleryQueryData,
} from '../../../graphql/gallery/get_galleries.query';
import { Gallery } from '../../../types/gallery';
import { parseError } from '../../../graphql/client';
import { GalleryCard } from '../../../components/gallery_card/GalleryCard';
import AboutBanner from '../../../assets/about.png';
import { Pagination } from '../../../components/pagination/Pagination';

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
  const [rowsPerPage] = React.useState(9);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    setPage(page);
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
        height={isMobile ? '100px' : '240px'}
      >
        <Container>
          <Box
            fontSize="h3.fontSize"
            fontWeight={700}
            color='white'
            className="media-banner-text"
          >
            Gallery
          </Box>
        </Container>
      </Box>

      <Container>
        <Box
          className="init-gallery-page"
          display='flex'
          justifyContent='center'
          height='fit-content'
        >
          <Box
            className="gallery-page"
            mt={3}
            display='flex'
            justifyContent='flex-start'
            flexWrap='wrap'
            flexDirection='row'
            alignItems='flrx-start'
            ml={13}
          >
            {map(
              galleries.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ),
              (gallery) => (
                <GalleryCard gallery={gallery} />
              )
            )}
          </Box>
        </Box>

        <Pagination
          className="pagination"
          activePage={page}
          rowsPerPage={rowsPerPage}
          onChange={(page: number) => {
            handlePageChange(page);
          }}
          imageLength={galleries.length}
        />
      </Container>
    </Box>
  );
};

export const Media = withTheme(styled(UnstyledMedia)`
  .media-banner-container {
    background-image: url(${AboutBanner});
    min-width: 100px; /*or 70%, or what you want*/
    background-size: 100% 100%;
  }

  .pagination {
    margin-top: 120px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
`);
