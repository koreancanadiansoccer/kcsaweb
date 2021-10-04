import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { GalleryCard } from "./GalleryCard"
import { HorizontalDivider } from "../../../components/divider/HorizontalDivider"

interface GalleryProps {
  className?: string;
}

const GalleryBanner = styled.div`
  height: 6px;
  width: 100%;
  max-width: 203px;
  margin: 0 auto;
  margin-top: 40px;
  padding-left: 0.8%;
`;
/**
 * Gallery Page.
 */
const UnstyledGallery: FunctionComponent<GalleryProps> = ({ className }) => {
  return (
    <>
      <GalleryBanner>
        <Typography variant="h3">Gallery</Typography>
      </GalleryBanner>
      <Box mt={9}>
        <HorizontalDivider />
      </Box>
      <Box
        className={className}
        mt={20}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignContent="center"
        flexDirection="row"
      >
        <GalleryCard />
      </Box>
    </>
  );
};

export const GalleryTable = withTheme(styled(UnstyledGallery)`
  .MuiTypography-h3 {
    padding-left: 10%;
  }
`);