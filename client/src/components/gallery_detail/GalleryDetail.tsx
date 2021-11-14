import React, { FunctionComponent } from "react";
import { withTheme, useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Gallery, GalleryImage } from "../../types/gallery";
import AboutBanner from "../../assets/about.png";
import { HorizontalDivider } from "../divider/HorizontalDivider";
import { AutoSlide } from "../auto_slide/AutoSlide";

interface GalleryDetailProps {
  className?: string;
}

/**
 * Detailed Gallery Slide show for Media tab
 */
const UnstyledGalleryDetail: FunctionComponent<GalleryDetailProps> = ({
  className,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        height={isMobile ? "100px" : "240px"}
      >
        <Container>
          <Box fontSize="2.5rem" fontWeight={700} color="white">
            Gallery
          </Box>
        </Container>
      </Box>

      <Container>
        <Box
          className="slide-title"
          pt={isMobile ? 4 : 8}
          display="flex"
          justifyContent="center"
        >
          <Container>
            <Box
              fontSize={
                isMobile
                  ? gallery.title.length > 20
                    ? "1.5rem"
                    : "2rem"
                  : "2.5rem"
              }
              fontWeight="bold"
            >
              {gallery.title}
            </Box>
            <HorizontalDivider margin="0" />
          </Container>
        </Box>

        <AutoSlide
          slidesContainerClassName={
            isMobile ? "slide-container-mobile" : "slide-container-desktop"
          }
          slidesImgClassName={
            isMobile
              ? "gallery-detail-slides-desktop"
              : "gallery-detail-slides-desktop"
          }
          galleryImages={galleryImages}
          intervalTime={4000}
          activeThumbnail={true}
          isMobile={isMobile}
        />
      </Container>
    </Box>
  );
};

export const GalleryDetail = withTheme(styled(UnstyledGalleryDetail)`
  .media-banner-container {
    background-image: url(${AboutBanner});
    min-width: 100%; /*or 70%, or what you want*/
    background-size: 100% 100%;
  }

  .slide-container-desktop {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    height: 47rem;
    overflow: hidden;
  }

  .gallery-detail-slides-desktop {
    display: falex;
    width: 100%;
    height: 755px;
    justify-content: center;

    .slider-image {
      height: inherit;
      min-width: 55rem;
    }
  }

  .slide-container-mobile {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    height: 24rem;
  }

  .gallery-detail-slides-desktop {
    width: 100%;
    height: 100%;

    .slider-image {
      height: inherit;
      min-width: 100%;
    }
  }
`);
