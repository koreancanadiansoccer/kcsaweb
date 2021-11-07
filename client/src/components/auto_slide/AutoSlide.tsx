import React, {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import map from 'lodash/map';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { GalleryImage } from '../../types/gallery';
import { Thumbnail } from '../thumbnail/Thumbnail';

interface AutoSlideProps {
  className?: string;
  slidesContainerClassName?: string;
  slidesImgClassName?: string;
  galleryImages: GalleryImage[];
  intervalTime: number;
  activeThumbnail: boolean;
  numOfThumbnail?: number;
}

/**
 * Automatic Slide show for images
 */
const UnstyledAutoSlide: FunctionComponent<AutoSlideProps> = ({
  className,
  slidesContainerClassName = 'default-slide-container',
  slidesImgClassName = 'default-slides',
  galleryImages,
  intervalTime = 2000,
  activeThumbnail = false,
  numOfThumbnail = 6,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  // When new Gallery is rendering, preventing delays in showing images
  if (activeIndex >= galleryImages.length) {
    setActiveIndex(0);
  }

  if (!galleryImages) {
    return <div>loading...</div>;
  }

  return (
    <Box className={className}>
      <Box className={slidesContainerClassName}>
        {map(galleryImages, (image, index) => (
          <Box
            key={index}
            className={
              /* Use css to choose whether to show the image or not */
              index === activeIndex
                ? `active ${slidesImgClassName}`
                : `inactive ${slidesImgClassName}`
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
        <>
          <Box display="flex" justifyContent="center">
            <Box display="flex" justifyContent="flex-end" width="70rem">
              <Typography variant="subtitle1" component="div">
                {activeIndex + 1} / {galleryImages.length}
              </Typography>
            </Box>
          </Box>

          <Thumbnail
            galleryImages={galleryImages}
            numOfThumbnail={numOfThumbnail}
            onSelect={(index: number) => setActiveIndex(index)}
            activeIndex={activeIndex}
          />
        </>
      )}
    </Box>
  );
};

export const AutoSlide = withTheme(styled(UnstyledAutoSlide)`
  .active {
    display: flex !important;
  }

  .inactive {
    display: none !important;
  }
`);
