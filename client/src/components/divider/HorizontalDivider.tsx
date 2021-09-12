import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

const Divider = styled.div`
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
  margin: 0 auto;
`;

export const HorizontalDivider = () => {
  return (
    <Box>
      <Divider />
    </Box>
  );
};
