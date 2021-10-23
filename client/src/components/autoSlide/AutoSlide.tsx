import React, { FunctionComponent, useEffect, useState } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import map from 'lodash/map';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { Gallery, GalleryImage } from '../../types/gallery';

interface AutoSlideProps {
  className?: string;
  galleryImages: GalleryImage[];
  intervalTime: number;
  activeThumbnail: boolean;
  clickedIndex: number;
}

/**
 * Automatic Slide show for images
 */
const UnstyledAutoSlide: FunctionComponent<AutoSlideProps> = ({
  className,
  galleryImages,
  intervalTime = 2000,
  activeThumbnail = false,
  clickedIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [curClickIndex, setCurClickIndex] = useState(clickedIndex);

  useEffect(() => {
    // Use interval to make automatic slides.
    if (galleryImages && galleryImages.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex(
          activeIndex >= galleryImages.length - 1 ? 0 : activeIndex + 1
        );
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [activeIndex]);

  // Showing clicked thumbnails while preventing infinite render
  if (curClickIndex !== clickedIndex) {
    setCurClickIndex(clickedIndex);
    setActiveIndex(clickedIndex);
  }

  // When new Gallery is rendering, preventing delays in showing images
  if (activeIndex >= galleryImages.length) {
    setActiveIndex(0);
  }

  if (!galleryImages) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Box className={className}>
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
      {activeThumbnail && (
        <Box className="slide-pagination">
          <Typography variant="subtitle1" component="div">
            {activeIndex + 1} / {galleryImages.length}
          </Typography>
        </Box>
      )}
    </>
  );
};

export const AutoSlide = withTheme(styled(UnstyledAutoSlide)``);
