import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Announcement } from '../../types/announcement';

interface HomeMobileProps {
  className?: string;
  announcements: Announcement[];
  mainIdx: number;
  mainIdxUpdate: (idx: number) => void;
  subIdx: number;
  subIdxUpdate: (idx: number) => void;
  isMedium: boolean;
}

/**
 * Mobile Hero for main home page.
 */
const UnstyledHeroContentMobile: FunctionComponent<HomeMobileProps> = ({
  className,
  announcements,
  mainIdx,
  mainIdxUpdate,
}) => {
  const history = useHistory();

  return (
    <Box className={className}>
      {/* Main */}
      <motion.div
        initial={{ opacity: 0, x: 100, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Box
          display="flex"
          justifyContent="space-evenly"
          flexDirection="column"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            history.push({
              pathname: '/announcement',
              state: { announcement: announcements[mainIdx] },
            });
          }}
        >
          {announcements[mainIdx].imageURL && (
            <img
              src={announcements[mainIdx].imageURL}
              alt="hero-main"
              style={{
                height: '30vh',
                objectFit: 'contain',
              }}
            />
          )}

          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            mt={3}
          >
            <ChevronLeftIcon
              className="chevron-left"
              onClick={(evt) => {
                evt.stopPropagation();
                mainIdxUpdate(-1);
              }}
            />

            <Box
              mx={3}
              style={{ cursor: 'pointer' }}
              onClick={(evt) => {
                evt.stopPropagation();
                history.push(
                  `/announcement/${announcements[mainIdx].id}
                  )}`
                );
              }}
            >
              <Box fontSize="1rem">{announcements[mainIdx].title}</Box>

              <Box mt={1}>{announcements[mainIdx].subtitle}</Box>

              <Box mt={3}>More &gt;</Box>
            </Box>

            <ChevronRightIcon
              className="chevron-right"
              onClick={(evt) => {
                evt.stopPropagation();
                mainIdxUpdate(1);
              }}
            />
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export const HeroContentMobile = withTheme(styled(UnstyledHeroContentMobile)`
  color: white;
  font-weight: 700;
  word-break: break-word;
  .hero-text-medium {
    font-size: 1rem;
    line-height: 1;
  }

  .chevron-left {
    font-size: 4rem;
    color: white;
    cursor: pointer;
    opacity: 0.3;
  }

  .chevron-right {
    font-size: 4rem;
    color: white;
    cursor: pointer;
    opacity: 0.3;
  }
`);
