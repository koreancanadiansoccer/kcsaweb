import React, {
  FunctionComponent,
  useState,
  useContext,
  useCallback,
} from 'react';
import { withTheme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import HeroImage from '../../assets/hero.png';
import { VerticalDivider } from '../divider/VerticalDivider';
import { ViewerContext } from '../../context/homeViewer';

import { HeroContentDesktop } from './HeroContentDesktop';
import { HeroContentMobile } from './HeroContentMobile';

interface HomeProps {
  className?: string;
}

/**
 * Hero for main home page.
 */
const UnstyledHero: FunctionComponent<HomeProps> = ({ className }) => {
  const { viewer } = useContext(ViewerContext);

  const [mainIdx, setMainIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(1);
  const history = useHistory();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  const mainIdxUpdate = useCallback(
    (value: number) => {
      // Guard against empty viewer data.
      if (!viewer || !viewer.announcements) {
        setMainIdx(0);
        return;
      }

      const newIdxValue = mainIdx + value;

      // If value + currentIdx > announcement.length, set newIdx as 0.
      if (newIdxValue > viewer.announcements.length - 1) {
        setMainIdx(0);
        return;
      }

      // If currentIdx - value < 0 -> set new idx as announment.length;
      if (newIdxValue < 0) {
        setMainIdx(viewer.announcements.length - 1);
        return;
      }

      //otherwise, just add value to idx.
      setMainIdx(newIdxValue);
    },
    [mainIdx, setMainIdx, viewer]
  );

  const subIdxUpdate = useCallback(
    (value: number) => {
      if (!viewer || !viewer.announcements) {
        setSubIdx(0);
        return;
      }
      const newIdxValue = subIdx + value;

      if (newIdxValue > viewer.announcements.length - 1) {
        setSubIdx(0);
        return;
      }

      if (newIdxValue < 0) {
        setSubIdx(viewer.announcements.length - 1);
        return;
      }

      setSubIdx(newIdxValue);
    },
    [subIdx, setSubIdx, viewer]
  );

  // No announcements.
  if (!viewer?.announcements || viewer.announcements.length === 0) {
    return (
      <Box className={className}>
        <Box className="hero" display="flex" alignItems="center">
          <Container className="hero-content">
            <Box display="flex" alignItems="center">
              <VerticalDivider height={5} maxHeight={5} />

              <Box color="white" ml={3}>
                <Box fontSize={isMobile ? '2rem' : '2.5rem'} fontWeight={700}>
                  {"Welcome to KCSA's Official Website"}
                </Box>

                <Box
                  mt={1}
                  fontSize={isMobile ? '1rem' : '1.5rem'}
                  fontWeight={700}
                >
                  No Media Contents Available: New Season Coming Soon
                </Box>
              </Box>
            </Box>

            <Box
              mt={10}
              ml={4}
              color="white"
              fontSize="1rem"
              fontWeight={700}
              onClick={() => {
                history.push(`/overview`);
              }}
              className="hero-more"
            >
              About KCSA More Information &gt;
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={className}>
      {isMobile ? (
        <Box className="hero" pt={3}>
          <HeroContentMobile
            announcements={viewer.announcements}
            mainIdx={mainIdx}
            mainIdxUpdate={(idx: number) => {
              mainIdxUpdate(idx);
            }}
            subIdx={subIdx}
            subIdxUpdate={(idx: number) => {
              subIdxUpdate(idx);
            }}
            isMedium={isMedium}
          />
        </Box>
      ) : (
        <Box className="hero" display="flex" alignItems="center">
          <Container className="hero-content">
            <HeroContentDesktop
              announcements={viewer.announcements}
              mainIdx={mainIdx}
              mainIdxUpdate={(idx: number) => {
                mainIdxUpdate(idx);
              }}
              subIdx={subIdx}
              subIdxUpdate={(idx: number) => {
                subIdxUpdate(idx);
              }}
              isMedium={isMedium}
            />
          </Container>
        </Box>
      )}
    </Box>
  );
};

export const Hero = withTheme(styled(UnstyledHero)`
  .hero {
    background-image: url(${HeroImage});
    height: 25vw; /*or 70%, or what you want*/
    min-height: 470px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 100% 100%;

    ${(props) => props.theme.breakpoints.up('xl')} {
      height: 20vw; /*or 70%, or what you want*/
      background-position: 50% 50%;
      background-size: 100% 100%;
    }
  }
`);
