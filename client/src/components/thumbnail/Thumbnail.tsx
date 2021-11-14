import React, { FunctionComponent, useEffect, useState } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import map from "lodash/map";
import Box from "@material-ui/core/Box";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { GalleryImage } from "../../types/gallery";
import { Pagination } from "../pagination/Pagination";

interface ThumbnailProps {
  className?: string;
  galleryImages: GalleryImage[];
  numOfThumbnail: number;
  activeIndex: number;
  onSelect: (index: number) => Promise<void>;
  isMobile?: boolean;
}

/**
 * Thumbnail components
 */
const UnstyledThumbnail: FunctionComponent<ThumbnailProps> = ({
  className,
  galleryImages,
  numOfThumbnail,
  activeIndex,
  onSelect,
  isMobile = false,
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
      setPage(activeIndex);
    } else if (activeIndex % numOfThumbnail == 0 && page < lastPage - 1) {
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

  const handlePageChange = async (page: number) => {
    setPage(page);
  };

  return (
    <Box className={className} display="flex" justifyContent="center" mb={6}>
      <Box display="flex" width="100%" flexDirection={isMobile ? "column" : ""}>
        <Box
          display="flex"
          justifyContent="flex-start"
          px={isMobile ? 0 : 2}
          width="100%"
          className="thumbnail-box"
        >
          {isMobile ? (
            <>
              {map(
                galleryImages.slice(
                  page * numOfThumbnail,
                  page * numOfThumbnail + numOfThumbnail
                ),
                (img, index) => (
                  <Box
                    className={
                      activeIndex === index + page * numOfThumbnail
                        ? "mobile-thumbnail-item clicked-thumbnail"
                        : "mobile-thumbnail-item"
                    }
                    key={index}
                    flex={activeIndex === index + page * numOfThumbnail ? 3 : 1}
                    height={100}
                  >
                    <img
                      src={img.imageURL}
                      alt={img.id}
                      onClick={() =>
                        void onSelect(index + page * numOfThumbnail)
                      }
                    />
                  </Box>
                )
              )}
            </>
          ) : (
            <>
              {galleryImages.length > numOfThumbnail && page !== 0 && (
                <ChevronLeftIcon
                  className="chevron-left"
                  onClick={() => prevPageChange()}
                />
              )}

              {map(
                galleryImages.slice(
                  page * numOfThumbnail,
                  page * numOfThumbnail + numOfThumbnail
                ),
                (img, index) => (
                  <Box
                    className={
                      activeIndex === index + page * numOfThumbnail
                        ? "desktop-thumbnail-item clicked-thumbnail"
                        : "desktop-thumbnail-item"
                    }
                    key={index}
                  >
                    <img
                      src={img.imageURL}
                      alt={img.id}
                      onClick={() =>
                        void onSelect(index + page * numOfThumbnail)
                      }
                    />
                  </Box>
                )
              )}

              {/* Only show the arrow button when the number of images over numOfThumbnail */}
              {galleryImages.length > numOfThumbnail &&
                page !== lastPage - 1 && (
                  <ChevronRightIcon
                    className="chevron-right"
                    onClick={() => nextPageChange()}
                  />
                )}
            </>
          )}
        </Box>

        {isMobile && galleryImages.length > numOfThumbnail && (
          <Pagination
            className="pagination"
            activePage={page}
            rowsPerPage={numOfThumbnail}
            onChange={(page: number) => {
              handlePageChange(page);
            }}
            imageLength={galleryImages.length}
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

  .desktop-thumbnail-item {
    height: 100px;
    cursor: pointer;
    margin: 1rem 1.5rem 1rem 1.5rem;
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

  .mobile-thumbnail-item {
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
      max-width: 100%;
      filter: grayscale(1);
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

  .pagination {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;

    div {
      font-size: large;
    }

    div svg {
      font-size: medium;
    }
  }
`);
