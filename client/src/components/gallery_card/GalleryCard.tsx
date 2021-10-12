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


interface GalleryProps {
  className?: string;
  id: string;
  title: string;
  imageURL: string;
  createdAt: string;
}

/**
 * To make Gallery Card on Media Tap under Announcement.
 */
const UnstyledGalleryCard: FunctionComponent<GalleryProps> = ({
  className,
  id,
  title,
  imageURL,
  createdAt,
}) => {
  const history = useHistory();

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 60 }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.1 }}
      className={className}
    >
      <CardActionArea
        onClick={() => {
          history.push(`/gallery/${id}`);
        }}
        className="click-card"
      ></CardActionArea>
      <CardMedia className="card-image" image={imageURL} component="img" />
      <CardContent>
        <Box className="desc-h5">
          <Typography variant={'h5'}>{title}</Typography>
        </Box>
        <Box className="desc-date">
          <Typography variant={'body2'}>{createdAt}</Typography>
        </Box>
      </CardContent>
    </motion.div>
  );
};

export const GalleryCard = withTheme(styled(UnstyledGalleryCard)`
  .click-card {
    z-index: 2;
    position: absolute;
    width: 86%;
    height: 89%;
    border-bottom-right-radius: 35px;
    border-bottom-left-radius: 35px;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    border: 0.5px solid rgba(209, 209, 213, 0.51);
    cursor: pointer;
    border-radius: 35px;
  }

  .card-image {
    height: 200px;
    border-top-right-radius: 34px;
    border-top-left-radius: 34px;
  }

  .desc-h5 {
    height: 50px;
  }

  .MuiTypography-h5 {
    font-size: 0.9rem;
  }

  .MuiTypography-body2 {
    font-size: 0.76rem;
  }
`);