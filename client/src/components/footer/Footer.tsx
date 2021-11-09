import React, { FunctionComponent } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withTheme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components';

import Logo from '../../assets/logo_new.svg';

interface FooterProps {
  className?: string;
}

const UnstyledNavigation: FunctionComponent<FooterProps> = ({ className }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Box className={className}>
        <Box className="footer-container">
          <Container>
            <Box
              display="flex"
              alignContent="center"
              justifyContent="center"
              mt={4}
            >
              <Box>
                Contact
                <Box className="title-line" mt={1} />
                <Box mt={1.5}>647-542-7942</Box>
                <Box mt={1.5}>koreancanadiansoccer@gmail.com</Box>
                <Box mt={1.5}>
                  리그 참가 및 재 캐나다 대한축구협회에 대한 질문은 위의 E-mail
                  로 해주시면 감사하겠습니다.
                </Box>
              </Box>
              <Box>
                <img
                  src={Logo}
                  alt="color-logo-pic"
                  className="color-logo-pic"
                />
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }
  return (
    <Box className={className}>
      <Box className="footer-container">
        <Container>
          <Box display="flex" alignItems="flex-left" justifyContent="flex-left">
            <Box mt={8}>
              <img src={Logo} alt="color-logo-pic" className="color-logo-pic" />
            </Box>
            <Box borderLeft={1} borderColor="#ffffff" ml={11} mt={5}></Box>
            <Box>
              <Box className="contact-title" mt={5} ml={10}>
                Contact
                <Box className="title-line" mt={2.5} />
              </Box>
              <Box className="contact-content" mt={2.5} ml={10}>
                <Typography>
                  647-542-7942
                  <br />
                  <br />
                  koreancanadiansoccer@gmail.com
                  <br />
                  <br />
                  리그 참가 및 재 캐나다 대한축구협회에 대한 질문은 위의 E-mail
                  로 해주시면 감사하겠습니다.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export const Footer = withTheme(styled(UnstyledNavigation)`
  color: white;

  .footer-container {
    background-color: #1c1c1c;
    height: 15rem;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .color-logo-pic {
    width: 100px;
  }

  .separate-line {
    background-color: #ffffff;
    width: 14.75rem;
    height: 0rem;
  }
  .contact-title {
    font-weight: bold;
    font-size: 0.938rem;
    line-height: 1.099rem;
  }

  .title-line {
    background-color: #ffffff;
    width: 1.625rem;
    height: 0.25rem;
  }

  .contact-content {
    font-weight: normal;
    font-size: 0.813rem;
    line-height: 0.952rem;
  }
`);
