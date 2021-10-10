import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import { Aboutbanner } from '../../components/about/Aboutbanner';
import { About } from '../../components/about/About';
import { President } from '../../components/about/President';
import { Contact } from '../../components/about/Contact';

interface AboutOverviewProps {
  className?: string;
}

/* 특정버튼 클릭시 스크롤  */
/**
 * About Page.
 */
const UnstyledAboutOverview: FunctionComponent<AboutOverviewProps> = ({ className }) => {
  return (
    <>
      <Aboutbanner />
      <About />
      <Divider className="divider-line" variant="middle" />
      <President />
      <Divider className="divider-line" variant="middle" />
      <Contact />
    </>
  );
};

export const AboutOverview = withTheme(styled(UnstyledAboutOverview)`
  .divider-line {
    background-color: #c4c4c4;
    width: 888px;
    height: 0px;
    left: 511px;
    top: 1051px;
    border: 1px solid #c4c4c4;
  }
`);
