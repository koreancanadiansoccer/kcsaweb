import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import { motion } from 'framer-motion';

import { Gallery } from "../../types/gallery"
import GalleryBackgroundImage from '../../assets/gallery-background-image.png';


interface GalleryProps {
  className?: string;
  gallery: Gallery;
}

/**
 * Display single card for an album on /media route
 */
const UnstyledGalleryCard: FunctionComponent<GalleryProps> = ({
  className,
  gallery,
}) => {
  const history = useHistory();

  if (!gallery) {
    return <div>loading...</div>
  }

  return (
    <Box className={className}>

      <motion.div
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 60 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.15 }}
        className="show-card"
      >
        <CardActionArea
          onClick={() => {
            history.push({
              pathname: `/gallery/${gallery.id}`,
              state: { gallery: gallery },
            });
          }}
          className="click-card"
        >
          <CardMedia
            className="card-image"
            image={gallery.galleryImages![0].imageURL}
            component="img"
          />

          <CardContent className="card-content">
            <Box className="desc-h5">
              <Typography variant='h5'>{gallery.title}</Typography>
            </Box>
            <Box className="desc-date">
              <Typography variant='body2'>
                {gallery.createdAt.slice(0, 10)}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </motion.div>

      <CardMedia
        className="first-background"
        image={GalleryBackgroundImage}
        component="img"
      />
      <CardMedia
        className="second-background"
        image={GalleryBackgroundImage}
        component="img"
      />
    </Box>
  );
};

export const GalleryCard = withTheme(styled(UnstyledGalleryCard)`
  .show-card {
    display: block;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 3;
    position: relative;
  }

  .click-card {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 0.5px solid #eeeeee;
    cursor: pointer;
  }

  .card-image {
    height: 267px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .card-content {
    background: #ffffff;
    border-radius: 0 0 10px 10px;
  }

  .desc-h5 {
    height: 50px;
  }

  .MuiTypography-h5 {
    font-size: 0.95rem;
    font-weight: bold;
  }

  .MuiTypography-body2 {
    font-size: 0.76rem;
  }

  .first-background {
    margin-left: 0.6rem;
    margin-top: -17.3rem;
    position: relative;
    height: 103%;
    z-index: 2;
    opacity: 0.6;
    border-radius: 10px;
  }

  .second-background {
    margin-left: 1.07rem;
    margin-top: -21.9rem;
    position: relative;
    height: 102.5%;
    z-index: 1;
    opacity: 0.3;
    border-radius: 10px;
  }
`);
