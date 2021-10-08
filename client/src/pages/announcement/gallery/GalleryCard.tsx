import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import { withTheme, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { map } from 'lodash';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";

import { Gallery } from '../../../types/gallery';
import { parseError } from '../../../graphql/client';
import { GET_GALLERIES, GalleryQueryData } from '../../../graphql/gallery/get_galleries.query';

interface GalleryProps {
  className?: string;
}

export const cardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
      height: 500,
      borderRadius: 5,
      transition: '0.3s',
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
      },
    },
    GridContainer: {
      paddingLeft: '10%',
      paddingRigt: '40px',
      maxHeight: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      overflow: 'auto',
    },

    action: {
      width: 300,
    },

    media: {
      height: '80%',
      width: '100%',
      position: 'relative',
      backgroundSize: 'contain',
    },

    content: {
      height: '20%',
    },

    contentBody: {
      marginTop: 20,
    },
  })
);

/**
 * To make Gallery Card.
 */

const UnstyledGalleryCard: FunctionComponent<GalleryProps> = ({ className }) => {
  const [galleries, setGalleries] = useState<Gallery[]>();

  // Get Galleries data
  const galleriesQuery = useQuery<GalleryQueryData>(GET_GALLERIES);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  // Pull gallery data.
  useEffect(() => {
    setLoading(galleriesQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && galleriesQuery?.data?.getGalleries) {
      setGalleries(galleriesQuery.data.getGalleries);
    }

    if (galleriesQuery.error) {
      setError(parseError(galleriesQuery.error));
    }
  }, [galleriesQuery, loading, error]);

  const classes = cardStyles();

  /**
   * Set table data.
   */
  const tableData: Gallery[] = useMemo(() => {
    return map(galleries, (gallery) => {
      return { ...gallery };
    });
  }, [galleries]);

  return (
    <Grid container spacing={7} direction="row" className={classes.GridContainer}>
      {tableData.map((item) => (
        <Grid item xs={3} key={item.id}>
          <CardActionArea
            className={classes.action}
            onClick={() => {
              history.push(`/gallery/${item.id}`);
            }}
          >
            <Card className={classes.root}>
              <CardMedia className={classes.media} image={'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6'} component="img" />
              <CardContent className={classes.content}>
                <Typography variant={'h5'}>{item.title}</Typography>
                <Typography variant={'body2'} className={classes.contentBody}>
                  {item.createdAt.slice(0, 10)}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
};

export const GalleryCard = withTheme(styled(UnstyledGalleryCard)``);
