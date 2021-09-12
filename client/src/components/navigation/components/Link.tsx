import React, { FunctionComponent } from "react";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { Link as RouteLink } from "react-router-dom";

interface NavigationProps {
  title: string;
  link: string;
}

export const Link: FunctionComponent<NavigationProps> = ({ title, link }) => {
  return (
    <Box mx={3}>
      <Typography variant="h6" color="inherit">
        <MenuItem component={RouteLink} to={link}>
          {title}
        </MenuItem>
      </Typography>
    </Box>
  );
};
