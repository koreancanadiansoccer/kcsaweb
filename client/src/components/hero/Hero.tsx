import React, { FunctionComponent, useState, useContext } from 'react';
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
  // const announcementRef = useRef(0);

  const [mainAnnouncementPosition, setMainAnnouncementPosition] = useState(0);
  // created this for the case when the sub box needs to show the first announcement and the main box shows last announcement within the list of announcements
  const [subAnnouncementPosition, setSubAnnouncementPosition] = useState(1);

  const history = useHistory();

  let announcementLength = 0;

  const incrementAnnouncement = () => {
    {
      mainAnnouncementPosition >= announcementLength
        ? setMainAnnouncementPosition(0)
        : setMainAnnouncementPosition(mainAnnouncementPosition + 1);
    }

    {
      subAnnouncementPosition >= announcementLength
        ? setSubAnnouncementPosition(0)
        : setSubAnnouncementPosition(subAnnouncementPosition + 1);
    }
  };

  const decrementAnnouncement = () => {
    {
      mainAnnouncementPosition === 0
        ? setMainAnnouncementPosition(announcementLength)
        : setMainAnnouncementPosition(mainAnnouncementPosition - 1);
    }
    {
      subAnnouncementPosition === 0
        ? setSubAnnouncementPosition(announcementLength)
        : setSubAnnouncementPosition(subAnnouncementPosition - 1);
    }
  };

  if (!viewer?.announcements) {
    return <div>loading...</div>;
  } else {
    announcementLength = viewer.announcements.length - 1;
  }

  return (
    <Box className={className}>
      <Box className="hero" display="flex" alignItems="center">
        {viewer.announcements.length > 0 && (
          <Container>
            <ChevronLeftIcon
              className="chevron-left"
              onClick={() => decrementAnnouncement()}
            />
            <Box display="flex" justifyContent="center" alignItems="center">
              {/* Main image */}

              <motion.div
                initial={{ opacity: 0, x: 100, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Box display="flex" justifyContent="flex-start">
                  <img
                    src={
                      viewer.announcements[mainAnnouncementPosition].imageURL
                    }
                    alt="hero-main"
                    className="hero-main-image"
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
                      onClick={() => incrementAnnouncement()}
                    >
                      <Box display="flex" justifyContent="flex-start">
                        <Box>
                          <img
                            src={
                              viewer.announcements[subAnnouncementPosition]
                                .imageURL
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
                              viewer.announcements[subAnnouncementPosition]
                                .title}
                          </Box>

                          <Box className="hero-text-small">
                            {viewer.announcements.length > 1 &&
                              viewer.announcements[subAnnouncementPosition]
                                .subtitle}
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
                      {viewer.announcements[mainAnnouncementPosition].title}
                    </Box>

                    <Box className="hero-text-medium" mt={2}>
                      {viewer.announcements[mainAnnouncementPosition].subtitle}
                    </Box>

                    <Box
                      className="hero-text-medium hero-more"
                      mt={4}
                      onClick={() => {
                        {
                          viewer.announcements &&
                            viewer.announcements[mainAnnouncementPosition] &&
                            history.push(
                              `/announcement/${viewer.announcements[mainAnnouncementPosition].id}`
                            );
                        }
                      }}
                    >
                      More &gt;
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Box>
            <ChevronRightIcon
              className="chevron-right"
              onClick={() => incrementAnnouncement()}
            />
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

  .hero-sub {
    max-height: 110px;

    .hero-sub-content {
      background-color: #2f4453;
      max-width: 263px;
      max-height: 110px;
      cursor: pointer;
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
    width: 40rem;
    height: 23.75rem;
  }

  .hero-sub-image {
    width: 10rem;
    height: 6.875rem;
    cursor: pointer;
  }

  .chevron-left {
    font-size: 5rem;
    left: 13rem;
    top: 17rem;
    position: absolute;
    color: white;
    cursor: pointer;
  }

  .chevron-right {
    font-size: 5rem;
    right: 15rem;
    top: 17rem;
    position: absolute;
    color: white;
    cursor: pointer;
  }
`);
