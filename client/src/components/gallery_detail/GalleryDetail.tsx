import React, { FunctionComponent, useEffect, useState, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import map from 'lodash/map';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Slick, { Settings } from 'react-slick';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Gallery, GalleryImage } from '../../types/gallery';
import AboutBanner from '../../assets/about.png';
import { HorizontalDivider } from '../divider/HorizontalDivider';

interface GalleryDetailProps {
  className?: string;
}

/**
 * Detailed Gallery Slide show for Media tab
 */
const UnstyledGalleryDetail: FunctionComponent<GalleryDetailProps> = ({
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const location = useLocation();
  const data = location.state as { gallery: Gallery };
  const gallery: Gallery = data.gallery;
  const galleryImages: GalleryImage[] = data.gallery.galleryImages!;

  useEffect(() => {
    // Use interval to make automatic slides.
    if (gallery && galleryImages.length > 0) {
      const len = galleryImages.length - 1;
      const interval = setInterval(() => {
        setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeIndex]);

  const thumbnailSetting = useMemo<Settings>(
    () => ({
      dots: false,
      arrows: true,
      slidesToShow: Math.min(galleryImages.length, 6),
      slidesToScroll: 6,
      autoplay: false,
      infinite: false,
    }),[]
  );

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

      <Box className="slide-title" mt={15}>
        <Typography variant="h1" component="div" className="slide-title-text">
          {gallery.title}
        </Typography>
        <HorizontalDivider />
      </Box>

      <Box className="slider-container">
        {map(galleryImages, (image, index) => (
          <Box
          key={index}
          className={
            /* Use css to choose whether to show the image or not */
            index === activeIndex
                ? 'active default-slides'
                : 'inactive default-slides'
            }
          >
            <img
              src={image.imageURL}
              alt={`${image.imageURL}-${image.id}`}
              className="slider-image"
            />
          </Box>
        ))}
      </Box>

      <Box className="slide-pagination">
        <Typography variant="subtitle1" component="div">
          {activeIndex + 1} / {galleryImages.length}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" height="20rem">
        <ChevronLeftIcon className="chevron-left" />
        <Slick
          {...thumbnailSetting}
          className={
            /* Depending on the length of the images, decide whether to use a single slide or not. */
            galleryImages.length < 7
              ? 'thumbnail-container custom-thumb-container'
              : 'thumbnail-container default-thub-container'
          }
        >
          {map(gallery.galleryImages, (img, index) => (
            <Box className="thumbnail-item" key={index}>
              <img
                src={img.imageURL}
                alt={img.id}
                onClick={() => setActiveIndex(index)}
              />
            </Box>
          ))}
        </Slick>
        <ChevronRightIcon className="chevron-right" />
      </Box>
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

  .slide-title {
    width: 70rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 44.5rem;

    .slide-title-text {
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 47px;
      margin-bottom: 1rem;
    }

    div {
      margin: 0;
    }
  }

  .slider-container {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    height: 47rem;
    overflow: hidden;
  }

  .default-slides {
    display: falex;
    width: 70rem;
    height: 755px;
    justify-content: center;
  }

  .active {
    display: flex;
  }

  .inactive {
    display: none;
  }

  .slider-image {
    height: inherit;
    min-width: 55rem;
  }

  .thumbnail-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70rem;
    height: 8rem;
    background: rgb(228 230 233);
  }

  .thumbnail-item {
    height: 100px;
    cursor: pointer;
    margin: 1rem;
    width: auto !important;

    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
      max-width: 100%%;
      filter: grayscale(1);
      &:hover {
        filter: none;
      }
    }
  }

  .slide-pagination {
    width: 70rem;
    display: flex;
    justify-content: flex-end;
    margin-left: 44.5rem;
  }

  .slick-list {
    width: 100%;
  }

  .custom-thumb-container {
    .slick-slide {
      width: auto !important;
    }

    .slick-track {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: auto !important;
    }
  }

  .chevron-left {
    font-size: 4rem;
    cursor: pointer;
    margin-top: 2rem;
  }

  .chevron-right {
    font-size: 4rem;
    cursor: pointer;
    margin-top: 2rem;
  }

  .slick-prev {
    left: -64px;
    width: 4rem;
    height: 4rem;
    opacity: 0;
  }

  .slick-next {
    right: -64px;
    width: 4rem;
    height: 4rem;
    opacity: 0;
  }
`);
