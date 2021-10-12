import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

interface DividerProps {
  height: number;
  maxHeight: number;
}

interface VerticalDividerProps {
  className?: string;
  height: number;
  maxHeight: number;
}

const Divider = styled.div<DividerProps>`
  width: 4px;
  background: linear-gradient(
    0deg,
    #f17f42 0%,
    #ffbc42 40.1%,
    #f17f42 75.52%,
    #f17f42 90.1%,
    #d81159 100%
  );
  height: ${(p) => p.height}px;
  max-height: ${(p) => p.maxHeight}px;
  float: left;
`;

export const VerticalDivider: React.FC<VerticalDividerProps> = ({
  className,
  height,
  maxHeight,
}) => {
  return (
    <Box className={className}>
      <Divider height={height} maxHeight={maxHeight} />
    </Box>
  );
};
