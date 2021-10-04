import React, { FunctionComponent, useState, useEffect } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useParams } from 'react-router';
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/client';
import { parseError } from '../../../graphql/client';
import Grid from '@material-ui/core/Grid';
import { cardStyles } from '../../../pages/announcement/gallery/GalleryCard'
import { HorizontalDivider } from '../../../components/divider/HorizontalDivider';
import CardMedia from '@material-ui/core/CardMedia';

import { GET_GALLERY, GalleryQueryData, GalleryQueryVariable } from '../../../graphql/gallery/get_gallery.query';
import { Gallery, GalleryImage } from '../../../types/gallery';
import { Typography } from '@material-ui/core';


interface GalleryProps {
  className?: string;
}

const GalleryBanner = styled.div`
  height: 6px;
  width: 100%;
  max-width: 203px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 5%;
`;

const UnstyledSelectedGallery: FunctionComponent<GalleryProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  const galleryQuery = useQuery<GalleryQueryData, GalleryQueryVariable>(GET_GALLERY, {
    variables: { id },
  });

  const [gallery, setGallery] = useState<Gallery>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(galleryQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && galleryQuery?.data?.getGallery) {
      setGallery(galleryQuery.data.getGallery);
    }

    if (galleryQuery.error) {
      setError(parseError(galleryQuery.error));
    }
  }, [galleryQuery, loading, error]);

  const classes = cardStyles();

  return (
    <>
      {gallery && (
        <>
          <GalleryBanner>
            <Typography variant="h3">{gallery.title}</Typography>
            <HorizontalDivider />
          </GalleryBanner>
          <Grid container spacing={7} direction="row" className={classes.GridContainer}>
            {gallery.galleryImages?.map((element: GalleryImage, index) => (
              <Grid item xs={3}>
                <CardMedia className={classes.media} image={element.imageURL} component="img" />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export const SelectedGallery = withTheme(styled(UnstyledSelectedGallery)``);
