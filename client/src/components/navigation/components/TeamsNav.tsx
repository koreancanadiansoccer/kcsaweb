import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link as RouteLink } from "react-router-dom";

import { Button } from "../../button/Button";

export const TeamsNav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="primary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box color="white">Teams</Box>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={RouteLink} to="/teams/1">
          Gunners
        </MenuItem>

        <MenuItem onClick={handleClose} component={RouteLink} to="/teams/2">
          Outliers
        </MenuItem>

        <MenuItem onClick={handleClose} component={RouteLink} to="/teams/3">
          TFT
        </MenuItem>
        <MenuItem onClick={handleClose} component={RouteLink} to="/teams/4">
          CICC
        </MenuItem>
      </Menu>
    </>
  );
};
