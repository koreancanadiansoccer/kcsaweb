import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import map from 'lodash/map';

import { Gallery } from '../../types/gallery';
import { ViewerContext } from '../../context/homeViewer';
import { AutoSlide } from '../auto_slide/AutoSlide';

interface GallerySlideProps {
  className?: string;
  mobileView?: boolean;
}

/**
 * Gallery Slide Show for main home page.
 */
const UnstyledGallerySlide: FunctionComponent<GallerySlideProps> = ({
  className,
  mobileView,
}) => {
  const { viewer } = useContext(ViewerContext);

  const [showGallery, setShowGallery] = useState<Gallery>();

  // initialize the default image ONLY when showGallery is an undefine
  useEffect(() => {
    if (viewer?.galleries && !showGallery) {
      setShowGallery(viewer.galleries[0]);
    }
  });

  if (!viewer?.galleries || !showGallery) {
    return <div>loading...</div>;
  }

  return (
    <Box
      ml={!mobileView && 10}
      sx={{ width: mobileView ? '100%' : '70%', height: '100%' }}
      className={className}
      position="relative"
      overflow="hidden"
    >
      <Box className="image-banner">
        <Typography variant="h6" className="image-title">
          {showGallery?.title}
        </Typography>
        <Box className="thumbnail-box">
          {map(viewer.galleries, (gallery) => (
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

      <AutoSlide
        className="slider-item"
        galleryImages={showGallery.galleryImages}
        intervalTime={4000}
      />
    </Box>
  );
};

export const GallerySlide = withTheme(styled(UnstyledGallerySlide)`
  box-shadow: 5px 5px 8px 0px gray;

  .image-banner {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 3;
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

  .slider-item {
    width: 100%;
    background-color: black;
  }

  .default-slides {
    display: falex;
    width: 100%;
    height: 441px;
    justify-content: center;

    .slider-image {
      height: inherit;
      width: auto;
    }
  }

  .active {
    display: flex;
  }

  .inactive {
    display: none;
  }
`);
