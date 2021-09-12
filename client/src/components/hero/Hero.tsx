import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import HeroImage from "../../assets/hero.png";
import HeroMainImage from "../../assets/demo_hero_main.png";
import HeroSubImage from "../../assets/demo_hero_sub.png";

import { VerticalDivider } from "../divider/VerticalDivider";

interface HomeProps {
  className?: string;
}

/**
 * Hero for main home page.
 */
const UnstyledHero: FunctionComponent<HomeProps> = ({ className }) => {
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
                      Korean Soccer Community
                    </Box>

                    <Box className="hero-text-small">
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="hero-text">
                <Box className="hero-text-large">Korean Soccer Community</Box>

                <Box className="hero-text-medium" mt={2}>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt
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
