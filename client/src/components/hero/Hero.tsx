import React, {
  FunctionComponent,
  useState,
  useContext,
  useCallback,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import HeroImage from '../../assets/hero.png';
import { VerticalDivider } from '../divider/VerticalDivider';
import { ViewerContext } from '../../context/homeViewer';

interface HomeProps {
  className?: string;
}

/**
 * Hero for main home page.
 */
const UnstyledHero: FunctionComponent<HomeProps> = ({ className }) => {
  const { viewer } = useContext(ViewerContext);

  const [mainAnnouncementIdx, setMainAnnouncementIdx] = useState(0);
  const [subAnnouncementIdx, setSubAnnouncementIdx] = useState(1);
  const history = useHistory();

  const updateIndex = useCallback(() => {
    if (viewer?.announcements) {
      const announcementLength = viewer.announcements.length - 1;
      {
        mainAnnouncementIdx - 1 < 0 &&
          setMainAnnouncementIdx(announcementLength);
      }
      {
        mainAnnouncementIdx + 1 > announcementLength &&
          setMainAnnouncementIdx(0);
      }
      {
        subAnnouncementIdx - 1 < 0 && setSubAnnouncementIdx(announcementLength);
      }
      {
        subAnnouncementIdx + 1 > announcementLength && setSubAnnouncementIdx(0);
      }
    }
  }, [mainAnnouncementIdx, subAnnouncementIdx]);

  if (!viewer?.announcements) {
    return <div>loading...</div>;
  }

  return (
    <Box className={className}>
      <Box className="hero" display="flex" alignItems="center">
        {viewer.announcements.length > 0 && (
          <Container className="hero-content">
            <Box display="flex" justifyContent="center" alignItems="center">
              <ChevronLeftIcon
                className="chevron-left"
                onClick={() => {
                  setMainAnnouncementIdx(mainAnnouncementIdx - 1);
                  setSubAnnouncementIdx(subAnnouncementIdx - 1);
                  updateIndex();
                }}
              />

              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, x: 100, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Box
                  className="hero-main-image"
                  display="flex"
                  justifyContent="flex-start"
                >
                  <img
                    src={viewer.announcements[mainAnnouncementIdx].imageURL}
                    alt="hero-main"
                  />

                  <VerticalDivider
                    height={380}
                    maxHeight={380}
                    className="first-divider"
                  />
                </Box>
              </motion.div>

              {/* Sub section */}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="left"
                height={385}
                ml={2}
              >
                {viewer.announcements.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 100, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Box
                      className="hero-sub"
                      onClick={() => {
                        setMainAnnouncementIdx(mainAnnouncementIdx + 1);
                        setSubAnnouncementIdx(subAnnouncementIdx + 1);
                        updateIndex();
                      }}
                    >
                      <Box display="flex" justifyContent="flex-start">
                        <Box>
                          <img
                            src={
                              viewer.announcements[subAnnouncementIdx].imageURL
                            }
                            alt="hero-sub"
                            className="hero-sub-image"
                          />
                        </Box>

                        <VerticalDivider height={110} maxHeight={110} />

                        <Box
                          className="hero-sub-content hero-text"
                          px={1.625}
                          py={1.625}
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          <Box display="flex" className="hero-text-medium">
                            {viewer.announcements.length > 1 &&
                              viewer.announcements[subAnnouncementIdx].title}
                          </Box>

                          <Box className="hero-text-small">
                            {viewer.announcements.length > 1 &&
                              viewer.announcements[subAnnouncementIdx].subtitle}
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
                  <Box className="hero-text">
                    <Box className="hero-text-large">
                      {viewer.announcements[mainAnnouncementIdx].title}
                    </Box>

                    <Box className="hero-text-medium" mt={2}>
                      {viewer.announcements[mainAnnouncementIdx].subtitle}
                    </Box>

                    <Box
                      className="hero-text-medium hero-more"
                      mt={4}
                      onClick={() => {
                        {
                          viewer.announcements &&
                            viewer.announcements[mainAnnouncementIdx] &&
                            history.push(
                              `/announcement/${viewer.announcements[mainAnnouncementIdx].id}`
                            );
                        }
                      }}
                    >
                      More &gt;
                    </Box>
                  </Box>
                </motion.div>
              </Box>
              <ChevronRightIcon
                className="chevron-right"
                onClick={() => {
                  setMainAnnouncementIdx(mainAnnouncementIdx + 1);
                  setSubAnnouncementIdx(subAnnouncementIdx + 1);
                  updateIndex();
                }}
              />
            </Box>
          </Container>
        )}
      </Box>
    </Box>
  );
};

export const Hero = withTheme(styled(UnstyledHero)`
  .hero {
    background-image: url(${HeroImage});
    min-width: 100px; /*or 70%, or what you want*/
    height: 490px; /*or 70%, or what you want*/
    background-size: 100% 100%;
  }

  .hero-content {
    margin-left: 13.5%;
    padding: 0;
  }

  .hero-sub {
    max-height: 6.875rem;
    cursor: pointer;

    .hero-sub-content {
      background-color: #2f4453;
      max-width: 16.438rem;
      max-height: 6.875rem;
    }
  }

  .hero-text {
    color: white;
    font-weight: 700;
    word-break: break-word;
    width: 30rem;

    .hero-text-large {
      font-size: 1.75rem;
    }

    .hero-text-medium {
      font-size: 1rem;
      line-height: 1;
    }

    .hero-text-small {
      font-size: 0.75rem;
    }
  }

  .hero-more {
    height: 25px;
    cursor: pointer;
  }

  .hero-main-image {
    margin-right: 2rem;
  }

  .hero-main-image img {
    width: 42.5rem;
    max-height: 23.75rem;
  }

  .hero-sub-image {
    width: 10rem;
    height: 6.875rem;
    cursor: pointer;
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
