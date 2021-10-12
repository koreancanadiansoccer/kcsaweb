import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { FunctionComponent, useState, useEffect } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import map from 'lodash/map';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

import {
  GET_MAIN_GALLERIES,
  GalleryQueryData,
} from '../../graphql/gallery/get_galleries.query';
import { parseError } from '../../graphql/client';
import { Gallery, GalleryImage } from '../../types/gallery';
import { AutoSlick } from '../slider/AutoSlick';
interface GalleryProps {
  className?: string;
}

const UnstyledGallerySlide: FunctionComponent<GalleryProps> = ({
  className,
}) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [showGallery, setShowGallery] = useState<Gallery>();

  const galleriesQuery = useQuery<GalleryQueryData>(GET_MAIN_GALLERIES);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(galleriesQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && galleriesQuery?.data?.getMainGalleries) {
      setGalleries(galleriesQuery.data.getMainGalleries);
      setShowGallery(galleriesQuery.data.getMainGalleries[0]);
    }

    if (galleriesQuery.error) {
      setError(parseError(galleriesQuery.error));
    }
  }, [galleriesQuery, loading, error]);

  if (!galleries || !showGallery) {
    return <div>loading...</div>;
  }

  return (
    <Box
      ml={10}
      sx={{ width: '70%', height: '441px' }}
      className={className}
      position="relative"
      overflow="hidden"
    >
      <Box className="image-banner">
        <Typography variant="h6" className="image-title">
          {showGallery?.title}
        </Typography>
        <Box className="thumbnail-box">
          {galleries?.map((gallery: Gallery) => (
            <Box
              key={gallery.id}
              className={
                showGallery.id == gallery.id
                  ? 'thumbnail show-thumbnail'
                  : 'thumbnail default-thumbnail'
              }
            >
              <img
                key={gallery.id}
                src={gallery.galleryImages![0].imageURL}
                alt="test"
                onClick={() => setShowGallery(gallery)}
              />
              <CheckCircleOutline className="check-circle" />
            </Box>
          ))}
        </Box>
      </Box>

      <AutoSlick arrow={false}>
        {showGallery?.galleryImages?.map((image: GalleryImage) => (
          <Box className="slider-item" key={image.id}>
            <img
              src={image.imageURL}
              alt={`${showGallery.title}_${image.id}`}
            />
          </Box>
        ))}
      </AutoSlick>
    </Box>
  );
};

export const GallerySlide = withTheme(styled(UnstyledGallerySlide)`
  .image-banner {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 3;
  }

  .image-banner: hover .image-title {
    transition-property: opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
    opacity: 1;
  }

  .image-banner: hover .thumbnail-box {
    transition-property: opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
    opacity: 1;
  }

  .image-title {
    width: 100%;
    position: relative;
    background: rgba(20, 36, 45, 0.7);
    z-index: 2;
    padding-left: 4%;
    font-size: x-large;
    font-weight: 500;
    color: white;
    margin-top: 0;
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
  }

  .thumbnail-box {
    position: relative;
    top: 71.28%;
    height: 20%;
    background: rgba(20, 36, 45, 0.7);
    justify-content: start;
    opacity: 0;
    display: flex;
    transition-property: opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
  }

  .slider-item {
    width: 100%;
    img {
      width: 100%;
      height: 441px;
    }
  }

  .thumbnail {
    width: 15%;
    cursor: pointer;
    filter: grayscale(1);
    display: flex;
    flex-direction: column;
    margin: 0.8%;

    &:hover {
      filter: none;
    }

    img {
      height: 100%;
      padding: 3%;
    }
  }

  .show-thumbnail {
    filter: grayscale(0);

    .check-circle {
      opacity: 1;
    }
  }

  .check-circle {
    color: rgb(104 195 36);
    position: absolute;
    opacity: 0;
  }
`);
