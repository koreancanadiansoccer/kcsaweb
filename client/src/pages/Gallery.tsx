import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

interface GalleryProps {
  className?: string;
}

/**
 * Main Gallery Page on Client side to show up
 */
const UnstyledGallery: FunctionComponent<GalleryProps> = ({ className }) => {
  return <Box>Gallery page</Box>;
};

export const Gallery = withTheme(styled(UnstyledGallery)``);