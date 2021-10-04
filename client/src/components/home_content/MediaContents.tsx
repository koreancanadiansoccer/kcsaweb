import React, { FunctionComponent, useState, useEffect, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { parseError } from '../../graphql/client';
import { map } from 'lodash';
import Box from "@material-ui/core/Box";

import { GET_MAIN_GALLERIES, GalleryQueryData } from '../../graphql/gallery/get_galleries.query';
import { Gallery, GalleryImage } from '../../types/gallery';

interface GalleryProps {
  className?: string;
}

const SliderItem = styled.div`
  width: 100%;
  img {
    width: 993px;
    height: 441px;
  }
`;

const UnstyledMediaContents: FunctionComponent<GalleryProps> = ({ className }) => {
  const [galleries, setGalleries] = useState<Gallery[]>();

  const galleriesQuery = useQuery<GalleryQueryData>(GET_MAIN_GALLERIES);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(galleriesQuery.loading);

    // If no error/loading set values.
    if (!loading && !error && galleriesQuery?.data?.getMainGalleries) {
      setGalleries(galleriesQuery.data.getMainGalleries);
    }

    if (galleriesQuery.error) {
      setError(parseError(galleriesQuery.error));
    }
  }, [galleriesQuery, loading, error]);

  const MediaData: Gallery[] = useMemo(() => {
    return map(galleries, (gallery) => {
      return { ...gallery };
    });
  }, [galleries]);

  return (
    <Box>
      {MediaData.map((images: Gallery) =>
        images.galleryImages!.map((element: GalleryImage, index) => (
          // <div className={className}
          // style={{ backgroundImage: `url(${element.imageURL})`,
          // width: "993px",
          // height: "441px"}}
          // >
          // </div>
          // <img src={element.imageURL} alt="test" width={933} height={441}/>
          <SliderItem key={index}>
            <img src={element.imageURL} alt={images.title} />
          </SliderItem>
        ))
      )}
    </Box>
  );
};

export const MediaContents = withTheme(styled(UnstyledMediaContents)``);
