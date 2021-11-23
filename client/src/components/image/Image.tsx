import React, { FunctionComponent } from 'react';
import { Image as OrigImage } from 'cloudinary-react';

const cloudName = 'dghrqguqx';

interface ImageProps {
  teamLogoURL?: string;
  className?: string;
  defaultImg?: string;
}

/**
 * Wrapper for cloudinary Image component.
 * @param param0
 * @returns
 */
export const Image: FunctionComponent<ImageProps> = ({
  teamLogoURL,
  className,
  defaultImg,
}) => {
  return teamLogoURL ? (
    <OrigImage
      cloudName={cloudName}
      publicId={teamLogoURL.split('|')[0]}
      version={teamLogoURL.split('|')[1]}
      className={className}
    />
  ) : (
    <img src={defaultImg} className={className} />
  );
};
