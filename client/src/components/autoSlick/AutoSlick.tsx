import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { FunctionComponent, useMemo } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';

const SlideWrapper = styled.section`
  position: relative;
`;

interface AutoSlickProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
  arrows: boolean;
}

/**
 * Base AutoSlick component.
 * Overrides default Slider of react-slick.
 */
const UnStyledAutoSlick: FunctionComponent<AutoSlickProps> = ({
  children,
  className,
  autoplay = true,
  speed = 300,
  loop = true,
  arrows,
}) => {
  const settings = useMemo<Settings>(
    () => ({
      dots: false,
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
      arrows: arrows,
    }),
    [autoplay, loop, speed]
  );

  return (
    <SlideWrapper className={className}>
      <Slider {...settings}>{children}</Slider>
    </SlideWrapper>
  );
};

export const AutoSlick = withTheme(styled(UnStyledAutoSlick)``);
