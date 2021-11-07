import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { Gallery, GalleryImage } from '../../types/gallery';
import AboutBanner from '../../assets/about.png';
import { HorizontalDivider } from '../divider/HorizontalDivider';
import { AutoSlide } from '../auto_slide/AutoSlide';

interface GalleryDetailProps {
  className?: string;
}

/**
 * Detailed Gallery Slide show for Media tab
 */
const UnstyledGalleryDetail: FunctionComponent<GalleryDetailProps> = ({
  className,
}) => {

  const location = useLocation();
  const data = location.state as { gallery: Gallery };
  const gallery: Gallery = data.gallery;
  const galleryImages: GalleryImage[] = data.gallery.galleryImages!;

  if (!gallery) {
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

      <Container>
        <Box
          className="slide-title"
          pt={12}
          display="flex"
          justifyContent="center"
        >
          <Box>
            <Typography
              variant="h1"
              component="div"
              className="slide-title-text"
            >
              {gallery.title}
            </Typography>
            <HorizontalDivider margin={'0'} />
          </Box>
        </Box>

        <AutoSlide
          slidesContainerClassName="slide-container"
          slidesImgClassName={'gallery-detail-slides'}
          galleryImages={galleryImages}
          intervalTime={4000}
          activeThumbnail={true}
        />
      </Container>
    </Box>
  );
};

export const GalleryDetail = withTheme(styled(UnstyledGalleryDetail)`
  .media-banner-container {
    background-image: url(${AboutBanner});
    min-width: 100%; /*or 70%, or what you want*/
    height: 284px; /*or 70%, or what you want*/
    background-size: 100% 100%;
  }

  .media-banner-text {
    font-weight: 700;
    color: white;
    margin-left: 7rem;
  }

  .slide-title-text {
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 47px;
    margin-bottom: 1rem;
  }

  .slide-container {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    height: 47rem;
    overflow: hidden;
  }

  .gallery-detail-slides {
    display: falex;
    width: 70rem;
    height: 755px;
    justify-content: center;

    .slider-image {
      height: inherit;
      min-width: 55rem;
    }
  }

`);
