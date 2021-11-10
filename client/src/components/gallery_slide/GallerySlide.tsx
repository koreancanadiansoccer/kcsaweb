import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import map from 'lodash/map';

import { Gallery } from '../../types/gallery';
import { ViewerContext } from '../../context/homeViewer';
import defaultImage from '../../assets/image_default.png';
import { AutoSlide } from '../auto_slide/AutoSlide';


interface GallerySlideProps {
  className?: string;
}

/**
 * Gallery Slide Show for main home page.
 */
const UnstyledGallerySlide: FunctionComponent<GallerySlideProps> = ({
  className,
}) => {
  const history = useHistory();
  const { viewer } = useContext(ViewerContext);

  const [showGallery, setShowGallery] = useState<Gallery>();

  // initialize the default image ONLY when showGallery is an undefine
  useEffect(() => {
    if (viewer?.galleries && !showGallery) {
      setShowGallery(viewer.galleries[0]);
    }
  });

  // const galleries = useMemo(() => {
  //   if(isEmpty(viewer.galleries)) return false;
  //   return viewer.galleries;
  // }, [viewer])

  // console.log(galleries)

  if (!viewer?.galleries || !showGallery) {
    return (
      <Box
        ml={10}
        sx={{
          width: '54rem',
          height: '26rem',
        }}
        className={className}
        position="relative"
      >
        <Box
          color='white'
          height={36}
          width='100%'
          position='absolute'
          className="default-banner"
          display='flex'
          alignItems='center'
        >
          <Box ml={4} fontSize='medium' fontWeight='bold'>
            Photos
          </Box>
        </Box>

        <Box
          className="default-image-background"
          height="inherit"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box>
              <img src={defaultImage} alt="default-image" />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              fontWeight="bold"
              fontSize="xx-large"
              color="#676668"
            >
              No Photo
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      ml={10}
      sx={{
        width: '56rem',
        height: '100%',
      }}
      className={className}
      position="relative"
      overflow="hidden"
    >
      <Box
        className="image-banner"
        onClick={() => {
          history.push({
            pathname: `/gallery/${showGallery.id}`,
            state: { gallery: showGallery },
          });
        }}
      >
        <Typography variant="h6" className="image-title">
          {showGallery.title}
        </Typography>

        <Box
          className="thumbnail-box"
          display="flex"
          justifyContent="start"
          position="relative"
        >
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
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGallery(gallery);
                }}
              />
              <CheckCircleOutline className="check-circle" />
            </Box>
          ))}
        </Box>
      </Box>

      <AutoSlide
        slidesContainerClassName="slider-item"
        slidesImgClassName='gallery-main-slides'
        galleryImages={showGallery.galleryImages}
        intervalTime={4000}
      />
    </Box>
  );
};

export const GallerySlide = withTheme(styled(UnstyledGallerySlide)`
  box-shadow: 5px 5px 8px 0px gray;

  .default-banner {
    background-color: rgba(20, 36, 45, 0.7);
  }

  .default-image-background {
    background-color: #414042;
  }

  .image-banner {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 3;
    cursor: pointer;
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
    top: 71.28%;
    height: 20%;
    background: rgba(20, 36, 45, 0.7);
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
    cursor: default;
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

  .gallery-main-slides {
    display: falex;
    width: 100%;
    height: 441px;
    justify-content: center;

    .slider-image {
      height: inherit;
      width: auto;
    }
  }
`);
