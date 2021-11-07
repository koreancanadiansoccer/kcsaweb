import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

interface DividerProps {
  margin: string;
}
interface HorizontalDividerProps {
  margin?: string;
}

const Divider = styled.div<DividerProps>`
  background: linear-gradient(
    90deg,
    #f17f42 0%,
    #ffbc42 40.1%,
    #f17f42 75.52%,
    #f17f42 90.1%,
    #d81159 100%
  );
  height: 6px;
  width: 100%;
  max-width: 203px;
  margin: ${(p) => p.margin};
`;

export const HorizontalDivider: React.FC<HorizontalDividerProps> = ({
  margin = '0 auto',
}) => {
  return (
    <Box>
      <Divider margin={margin} />
    </Box>
  );
};
