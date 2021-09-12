import React, { FunctionComponent } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

interface NavigationProps {
  title: string;
  link?: string;
}

export const Link: FunctionComponent<NavigationProps> = ({ title }) => {
  return (
    <Box mx={3}>
      <Typography variant="h6" color="inherit">
        {title}
      </Typography>
    </Box>
  );
};
