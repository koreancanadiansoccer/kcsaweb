import React, { FunctionComponent, useEffect, useState } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import map from 'lodash/map';
import Box from '@material-ui/core/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { GalleryImage } from '../../types/gallery';

interface ThumbnailProps {
  className?: string;
  galleryImages: GalleryImage[];
  numOfThumbnail?: number;
  activeIndex: number;
  onSelect: (index: number) => Promise<void>;
}

/**
 * Thumbnail components
 */
const UnstyledThumbnail: FunctionComponent<ThumbnailProps> = ({
  className,
  galleryImages,
  numOfThumbnail = 6,
  activeIndex,
  onSelect,
}) => {
  const [page, setPage] = useState(0);
  const [lastPage, SetLastPage] = useState(0);

  useEffect(() => {
    if (galleryImages.length > 0) {
      SetLastPage(
        galleryImages.length % numOfThumbnail == 0
          ? galleryImages.length / numOfThumbnail
          : Math.ceil(galleryImages.length / numOfThumbnail)
      );
    }

    if (activeIndex == 0) {
      setPage(activeIndex)
    }
    else if (activeIndex % numOfThumbnail == 0 && page < lastPage - 1) {
      setPage(page + 1);
    }

  }, [activeIndex]);

  const prevPageChange = () => {
    if (page > 0) {
      void setPage(page - 1);
    }
  };

  const nextPageChange = () => {
    if (page < lastPage - 1) {
      void setPage(page + 1);
    }
  };

  return (
    <Box className={className} display="flex" justifyContent="center" mb={6}>
      <Box display="flex">
        {/* Only show the arrow button when the number of images over numOfThumbnail */}
        {galleryImages.length > numOfThumbnail && (
          <ChevronLeftIcon
            className="chevron-left"
            onClick={() => prevPageChange()}
          />
        )}

        <Box display='flex' justifyContent='flex-start' px={2} width='70rem' className="thumbnail-box">
          {map(
            galleryImages.slice(
              page * numOfThumbnail,
              page * numOfThumbnail + numOfThumbnail
            ),
            (img, index) => (
              <Box
                className={
                  activeIndex === index + page * numOfThumbnail
                    ? 'thumbnail-item clicked-thumbnail'
                    : 'thumbnail-item'
                }
                key={index}
              >
                <img
                  src={img.imageURL}
                  alt={img.id}
                  onClick={() => void onSelect(index + page * numOfThumbnail)}
                />
              </Box>
            )
          )}
        </Box>

        {/* Only show the arrow button when the number of images over numOfThumbnail */}
        {galleryImages.length > numOfThumbnail && (
          <ChevronRightIcon
            className="chevron-right"
            onClick={() => nextPageChange()}
          />
        )}
      </Box>
    </Box>
  );
};

export const Thumbnail = withTheme(styled(UnstyledThumbnail)`
  .thumbnail-box {
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
      max-width: 100%;
      filter: grayscale(1);
      &:hover {
        filter: none;
      }
    }
  }

  .clicked-thumbnail {
    img {
      filter: none;
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
`);
