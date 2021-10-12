import React, { FunctionComponent, useState, useContext } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

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

  const [announcementMain, setAnnouncementMain] = useState(0);
  // created this for the case when the sub box needs to show the first announcement and the main box shows last announcement within the list of announcements
  const [announcementSub, setAnnouncementSub] = useState(1);

  const history = useHistory();

  let announcementLength = 0;

  if (viewer?.announcements) {
    announcementLength = viewer.announcements.length - 1;
    // console.warn(viewer?.announcements[announcementMain].id);
  }

  const incrementAnnouncement = () => {
    {
      announcementMain >= announcementLength
        ? setAnnouncementMain(0)
        : setAnnouncementMain(announcementMain + 1);
    }
    {
      announcementSub >= announcementLength
        ? setAnnouncementSub(0)
        : setAnnouncementSub(announcementSub + 1);
    }
  };

  return (
    <Box className={className}>
      <Box className="hero" display="flex" alignItems="center">
        {viewer?.announcements && viewer.announcements.length > 0 && (
          <Container>
            <Box display="flex" justifyContent="center" alignItems="center">
              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, x: 100, y: -100 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Box display="flex" justifyContent="flex-start">
                  <img
                    src={viewer.announcements[announcementMain].imageURL}
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
              ){/* Sub section */}
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
                    initial={{ opacity: 0, x: 50, y: -50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Box
                      className="hero-sub"
                      onClick={() => incrementAnnouncement()}
                    >
                      <Box display="flex" justifyContent="flex-start">
                        <Box>
                          <img
                            src={viewer.announcements[announcementSub].imageURL}
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
                              viewer.announcements[announcementSub].title}
                          </Box>

                          <Box className="hero-text-small">
                            {viewer.announcements.length > 1 &&
                              viewer.announcements[announcementSub].subtitle}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, x: 100, y: -100 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Box className="hero-text">
                    <Box className="hero-text-large">
                      {viewer.announcements[announcementMain].title}
                    </Box>

                    <Box className="hero-text-medium" mt={2}>
                      {viewer.announcements[announcementMain].subtitle}
                    </Box>

                    <Box
                      className="hero-text-medium hero-more"
                      mt={4}
                      onClick={() => {
                        {
                          viewer?.announcements &&
                            viewer?.announcements[announcementMain] &&
                            history.push({
                              pathname: `/announcement`,
                              state: viewer.announcements[announcementMain].id,
                            });
                        }
                      }}
                    >
                      More &gt;
                    </Box>
                  </Box>
                </motion.div>
              </Box>
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

  .hero-sub {
    max-height: 110px;

    .hero-sub-content {
      background-color: #2f4453;
      max-width: 263px;
      max-height: 110px;
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
  }

  .first-divider {
    margin-top: 0;
  }
`);
