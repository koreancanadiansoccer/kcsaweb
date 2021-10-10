import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import AboutBanner from '../../assets/about.png';

import { VerticalDivider } from '../divider/VerticalDivider';
import { Typography } from '@material-ui/core';

interface HomeProps {
  className?: string;
}

/**
 * Banner for About page.
 */
const UnstyledAboutBanner: FunctionComponent<HomeProps> = ({ className }) => {
  return (
    <Box className={className}>
      <Box className="about" display="flex" alignItems="center">
        <Container>
          <Box
            className="about-text"
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            color="white"
            flexDirection="column"
          >
            About KCSA
          </Box>
          {/* <Box className="about-text" display="flex" justifyContent="center" alignItems="center"> */}

          {/* </Box> */}
        </Container>
      </Box>
    </Box>
  );
};

export const Aboutbanner = withTheme(styled(UnstyledAboutBanner)`
  .about {
    background-image: url(${AboutBanner});
    min-width: 100px; /*or 70%, or what you want*/
    height: 490px; /*or 70%, or what you want*/
    background-size: 100% 100%;
  }
  .about-text {
    color: white;
    font-weight: 700;
    font-size: 40px;
    .about-text-medium {
      font-size: 20px;
      line-height: 1;
    }
  }
`);
