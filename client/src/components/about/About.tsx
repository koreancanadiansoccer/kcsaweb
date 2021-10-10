import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import ColorLogo from '../../assets/logo_color.svg';

import { VerticalDivider } from '../divider/VerticalDivider';

interface HomeProps {
  className?: string;
}

/**
 * About KCSA for About page.
 */
const UnstyledAbout: FunctionComponent<HomeProps> = ({ className }) => {
  return (
    <Box className={className}>
      <Container>
        <Box className="about" mt={10}>
          <Box className="about-title" mb={5}>
            About KCSA
            <Box className="title-line" mt={2.5} />
          </Box>

          <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
            <Box className="color-logo" mr={10}>
              <img src={ColorLogo} alt="color-pic" className="color-pic" />
            </Box>

            <Box className="about-subtitle" mb={3}>
              We are KCSA
              <Typography>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
                in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at
                vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis
                dolore te feugait nulla facilisi.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="seperate-line" mt={2.5} />
      </Container>
    </Box>
  );
};

export const About = withTheme(styled(UnstyledAbout)`
  .about-title {
    font-weight: bold;
    font-size: 40px;
    line-height: 47px;

    color: #000000;
  }
  .title-line {
    background-color: #f17f42;
    width: 95px;
    height: 4px;
    left: 361px;
    top: 546px;
    text-align: left;
  }
  .color-pic {
    width: 341px;
    height: 341px;
  }
  .about-subtitle {
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 33px;
    color: #274555;
  }
  .about-contents {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
  }
`);
