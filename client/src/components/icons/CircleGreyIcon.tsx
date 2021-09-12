import React, { FunctionComponent, useMemo } from "react";
import Box from "@material-ui/core/Box";

/**
 * Circle grey Icon
 * Note: Used as default team logo before we have actual icons
 */
interface CircleGreyIconProps {
  large?: boolean;
}

export const CircleGreyIcon: FunctionComponent<CircleGreyIconProps> = ({
  large = false,
}) => {
  const containerSize = useMemo(() => (large ? "80" : "44"), [large]);
  const circleSize = useMemo(() => (large ? "40" : "22"), [large]);

  return (
    <Box mx={2}>
      <svg
        width={containerSize}
        height={containerSize}
        viewBox={`0 0 ${containerSize} ${containerSize}`}
      >
        <circle cx={circleSize} cy={circleSize} r={circleSize} fill="#C4C4C4" />
      </svg>
    </Box>
  );
};
