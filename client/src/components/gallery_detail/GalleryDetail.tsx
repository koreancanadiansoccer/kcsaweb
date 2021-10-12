import React, {
  FunctionComponent,
  useState,
  useMemo,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Slick, { Settings } from 'react-slick';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';
import { scroller } from 'react-scroll';

import { Gallery, GalleryImage } from '../../types/gallery';
import { AutoSlick } from '../slider/AutoSlick';

interface GalleryProps {
  className?: string;
}

/**
 * To make Selected Gallery Slide show
 */
const UnstyledGalleryDetail: FunctionComponent<GalleryProps> = ({
  className,
}) => {
  const location = useLocation();
  const data = location.state as { gallery: Gallery };
  const gallery: Gallery = data.gallery;

  const [selectedImg, SetSelectedImg] = useState<GalleryImage>();

  const NavSlderSetting = useMemo<Settings>(
    () => ({
      dots: false,
      arrows: false,
      centerMode: true,
      slidesToShow: 6,
      swipeToSlide: true,
      focusOnSelect: true,
      autoplay: true,
    }),
    []
  );

  if (!gallery) {
    return <div>loading...</div>;
  }

  return (
    <Box className={className} mt={20}>
      <Box>
        <AutoSlick speed={200} arrows={false}>
          {map(gallery.galleryImages, (img) => (
            <Box className="slider-item" key={img.id}>
              <img src={img.imageURL} alt={`${gallery.title}_${img.id}`} />
            </Box>
          ))}
        </AutoSlick>

        {gallery.galleryImages && gallery.galleryImages?.length > 1 && (
          <Box className="thumbnail-gallery">
            {gallery.galleryImages.length > 7 ? (
              <Slick
                {...NavSlderSetting}
                className="thumbnail-slider-large"
                autoplay={false}
                slidesToShow={Math.min(gallery.galleryImages.length, 6)}
                arrows={true}
              >
                {map(gallery.galleryImages, (img) => (
                  <Box className="thumbnail-item" key={img.id}>
                    <img
                      src={img.imageURL}
                      alt={img.id}
                      onClick={() => {
                        SetSelectedImg(img);
                        scroller.scrollTo('zoom-box', {
                          smooth: true,
                          offset: 0,
                          duration: 500,
                          delay: 50,
                        });
                      }}
                    />
                  </Box>
                ))}
              </Slick>
            ) : (
              <Box className="thumbnail-slider-smaill">
                {map(gallery.galleryImages, (img) => (
                  <Box className="thumbnail-item">
                    <img
                      src={img.imageURL}
                      alt={img.id}
                      onClick={() => {
                        SetSelectedImg(img);
                        scroller.scrollTo('zoom-box', {
                          smooth: true,
                          offset: 0,
                          duration: 500,
                          delay: 50,
                        });
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
        <Box id="zoom-box">
          {selectedImg && (
            <Paper className="zoom-image">
              <Box>
                <Typography variant="h4">{gallery.title}</Typography>
              </Box>

              <Box className="zoom-image-container">
                <img src={selectedImg?.imageURL} alt={selectedImg?.id} />
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export const GalleryDetail = withTheme(styled(UnstyledGalleryDetail)`
  .slider-item {
    width: 100%;
    img {
      width: 100%;
      height: 441px;
    }
  }

  .thumbnail-gallery {
    position: relative;
    height: 150px;

    .thumbnail-item {
      filter: grayscale(1);
      &:hover {
        filter: none;
      }
    }

    .slick-current .paging_item {
      filter: none;
    }
  }

  .thumbnail-slider-large {
    .slick-list {
      background: rgb(228 230 233);
      padding: unset !important;

      .slick-track {
        padding-top: 5px;
      }
    }

    button {
      top: 11%;
    }
  }

  .thumbnail-slider-smaill {
    background: rgb(228 230 233);
    display: flex;
    width: 50%;
    margin-left: 25%;

    .thumbnail-item {
      width: auto;
    }
  }

  .thumbnail-item {
    width: 100%;
    text-align: center;
    height: 100px;
    cursor: pointer;

    img {
      height: 100%;
      vertical-align: top;
      max-width: 100%;
    }
  }

  .zoom-image {
    width: 63%;
    margin-left: 19%;
    height: 100%;
    border: 2px solid;

    img {
      width: 95%;
    }

    .zoom-image-container {
      text-align: center;
    }

    p {
      background-color: rgb(203 203 210 / 15%);
    }
  }

  .slick-slider {
    width: 50%;
    height: 460px;
    margin-left: 25%;
  }

  .slick-next {
    position: absolute;
    top: 50%;
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    transform: translateY(-50%);
    cursor: pointer;
    right: 0;
  }

  .slick-prev {
    position: absolute;
    top: 50%;
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    transform: translateY(-50%);
    cursor: pointer;
    left: 0;
    z-index: 2;
  }

  .zoom-image {
    margin-bottom: 3rem;
  }
`);