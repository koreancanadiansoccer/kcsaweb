import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

const Divider = styled.div`
  width: 4px;
  background: linear-gradient(
    0deg,
    #f17f42 0%,
    #ffbc42 40.1%,
    #f17f42 75.52%,
    #f17f42 90.1%,
    #d81159 100%
  );
  height: 110px;
  max-height: 110px;
  float: left;
`;

export const VerticalDivider = () => {
  return (
    <Box>
      <Divider />
    </Box>
  );
};
