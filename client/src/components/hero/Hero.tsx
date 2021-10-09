import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import { useQuery } from "@apollo/client";
import { parseError } from "../../graphql/client";

import { map } from "lodash";

import HeroImage from "../../assets/hero.png";
import HeroMainImage from "../../assets/demo_hero_main.png";
import HeroSubImage from "../../assets/demo_hero_sub.png";

import { VerticalDivider } from "../divider/VerticalDivider";

import { GET_HERO_ANNOUNCEMENTS } from "../../graphql/announcement/get_announcements.query";

import { Announcement } from "../../types/announcement";

interface HomeProps {
  className?: string;
}

/**
 * Hero for main home page.
 */
const UnstyledHero: FunctionComponent<HomeProps> = ({ className }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>();

  // Get Announcement data.

  const announcementDataQuery = useQuery(GET_HERO_ANNOUNCEMENTS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pull announcement data.
  useEffect(() => {
    setLoading(announcementDataQuery.loading);

    // If no error/loading set values.
    if (
      !loading &&
      !error &&
      announcementDataQuery?.data?.getHeroAnnouncements
    ) {
      setAnnouncements(announcementDataQuery.data.getHeroAnnouncements);
    }

    if (announcementDataQuery.error) {
      setError(parseError(announcementDataQuery.error));
    }
  }, [announcementDataQuery, loading, error]);

  const announcementsData: Announcement[] = useMemo(() => {
    return map(announcements, (announcement) => {
      return { ...announcement };
    });
  }, [announcements]);

  return (
    <Box className={className}>
      <Box className="hero" display="flex" alignItems="center">
        <Container>
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* Main image */}
            <Box>
              <img src={HeroMainImage} alt="hero-main" className="hero-main" />
            </Box>

            {/* Sub section */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="left"
              height={385}
              ml={2}
            >
              <Box className="hero-sub">
                <Box display="flex" justifyContent="flex-start">
                  <Box>
                    <img
                      src={HeroSubImage}
                      alt="hero-sub"
                      className="hero-sub"
                    />
                  </Box>

                  <VerticalDivider />

                  <Box
                    className="hero-sub-content hero-text"
                    px={1.625}
                    py={1.625}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box className="hero-text-medium">
                      {announcementsData[1]?.title}
                    </Box>

                    <Box className="hero-text-small">
                      {announcementsData[1]?.subtitle}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="hero-text">
                <Box className="hero-text-large">
                  {announcementsData[0]?.title}
                </Box>

                <Box className="hero-text-medium" mt={2}>
                  {announcementsData[0]?.subtitle}
                </Box>

                <Box className="hero-text-medium" mt={4}>
                  More &gt;
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
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

    .hero-text-large {
      font-size: 40px;
    }

    .hero-text-medium {
      font-size: 20px;
      line-height: 1;
    }

    .hero-text-small {
      font-size: 9px;
    }
  }
`);
