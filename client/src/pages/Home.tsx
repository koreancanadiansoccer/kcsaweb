import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

import { Hero } from '../components/hero/Hero';
import { Schedules } from '../components/schedules/Schedules';
import { HomeContent } from '../components/home_content/HomeContent';

interface HomeProps {
  className?: string;
}

/**
 * Main home page.
 */
const UnstyledHome: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Hero />
      <Schedules />
      <HomeContent />
    </>
  );
};

export const Home = withTheme(styled(UnstyledHome)``);
