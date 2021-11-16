import React, { FunctionComponent, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Logo from '../../assets/logo_new.svg';
import { VerticalDivider } from '../divider/VerticalDivider';
import { Announcement } from '../../types/announcement';

interface HomeDesktopProps {
  className?: string;
  announcements: Announcement[];
  mainIdx: number;
  mainIdxUpdate: (idx: number) => void;
  subIdx: number;
  subIdxUpdate: (idx: number) => void;
  isMedium: boolean;
}

/**
 * Hero for main home page.
 */
const UnstyledHeroContentDesktop: FunctionComponent<HomeDesktopProps> = ({
  className,
  announcements,
  mainIdx,
  mainIdxUpdate,
  subIdx,
  subIdxUpdate,
  isMedium,
}) => {
  const history = useHistory();

  const height = useMemo(() => {
    if (isMedium) return 25;
    return 15;
  }, [isMedium]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={className}
    >
      <ChevronLeftIcon
        className="chevron-left"
        onClick={() => {
          mainIdxUpdate(-1);
          subIdxUpdate(-1);
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: 100, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Main image */}
        <Box
          className="hero-main-image"
          display="flex"
          justifyContent="flex-start"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            history.push(`/announcement/${announcements[mainIdx].id}`);
          }}
        >
          <img src={announcements[mainIdx].imageURL || Logo} alt="hero-main" />

          <VerticalDivider height={height} maxHeight={height} />
        </Box>
      </motion.div>

      {/* Right section */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="left"
        height={`${height}vw`}
        ml={2}
      >
        {announcements.length > 1 && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Sub announcement */}
            <Box
              onClick={() => {
                history.push(`/announcement/${announcements[subIdx].id}`);
              }}
              style={{ cursor: 'pointer', backgroundColor: '#2f4453' }}
            >
              <Box display="flex" justifyContent="flex-start">
                <img
                  src={announcements[subIdx].imageURL || Logo}
                  alt="hero-sub"
                  className="hero-sub-image"
                />

                <VerticalDivider
                  height={height - 15 === 0 ? 5 : height - 15}
                  maxHeight={height - 15 === 0 ? 5 : height - 15}
                />

                <Box
                  className=" hero-text"
                  p={2}
                  maxWidth="20rem"
                  maxHeight={height - 15 === 0 ? 5 : height - 15}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box className="hero-text-medium">
                    {announcements[subIdx].title}
                  </Box>

                  <Box className="hero-text-small" fontSize="0.8rem">
                    {announcements[subIdx].subtitle}
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Main image text display */}
          <Box
            className="hero-text"
            width="30rem"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              history.push(`/announcement/${announcements[mainIdx].id}`);
            }}
          >
            <Box fontSize="1.5rem">{announcements[mainIdx].title}</Box>

            <Box className="hero-text-medium" mt={2}>
              {announcements[mainIdx].subtitle}
            </Box>

            <Box className="hero-text-medium hero-more" mt={4}>
              More &gt;
            </Box>
          </Box>
        </motion.div>
      </Box>
      <ChevronRightIcon
        className="chevron-right"
        onClick={() => {
          mainIdxUpdate(1);
          subIdxUpdate(1);
        }}
      />
    </Box>
  );
};

export const HeroContentDesktop = withTheme(styled(UnstyledHeroContentDesktop)`
  color: white;
  font-weight: 700;
  word-break: break-word;
  .hero-text-medium {
    font-size: 1rem;
    line-height: 1;
  }

  .hero-main-image {
    margin-right: 2rem;
  }

  .hero-main-image img {
    width: 25vw;
    height: 15vw;

    ${(props) => props.theme.breakpoints.down('md')} {
      width: 30vw;
      height: 25vw;
    }
  }

  .hero-sub-image {
    width: 10vw;
    height: 5vw;
    ${(props) => props.theme.breakpoints.down('md')} {
      width: 15vw;
      height: 10vw;
    }
  }

  .chevron-left {
    font-size: 4rem;
    color: white;
    cursor: pointer;
    margin-right: 5rem;
    opacity: 0.3;
  }

  .chevron-right {
    font-size: 4rem;
    color: white;
    cursor: pointer;
    opacity: 0.3;
  }
`);
