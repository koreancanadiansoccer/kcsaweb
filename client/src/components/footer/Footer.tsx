import React, { FunctionComponent, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

import { ViewerContext } from '../../context/homeViewer';
import ColorLogo from '../../assets/logo_footer.png';

interface FooterProps {
  className?: string;
}

const UnstyledNavigation: FunctionComponent<FooterProps> = ({ className }) => {
  const { viewer } = useContext(ViewerContext);

  return (
    <Box className={className}>
      <Box className="footer-container">
        <Container>
          <Box display="flex" alignItems="flex-left" justifyContent="flex-left">
            <Box className="color-logo" ml={10} mt={12}>
              <img
                src={ColorLogo}
                alt="color-logo-pic"
                className="color-logo-pic"
              />
            </Box>
            <Box>
              <Box className="contact-title" mt={12} ml={10}>
                Contact
                <Box className="title-line" mt={2.5} />
              </Box>
              <Box className="contact-content" mt={2.5} ml={10}>
                <Typography>
                  647-542-7942
                  <br />
                  <br />
                  kcsacanada@hotmail.com
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
  .footer-container {
    background-color: #1c1c1c;
    background-size: 100% 100%;
    height: 24.375rem;
  }
  .color-logo-pic {
    width: 130px;
    height: 130px;
  }

  .contact-title {
    font-weight: bold;
    font-size: 0.938rem;
    line-height: 1.099rem;
    color: #ffffff;
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
    color: #ffffff;
  }
`);
