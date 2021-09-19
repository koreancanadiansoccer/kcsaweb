import React, { FunctionComponent, useState } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link as RouteLink } from "react-router-dom";

import { Button } from "../button/Button";
import { Logo } from "../icons/Logo";

interface NavigationProps {
  className?: string;
}

const UnstyledNavigation: FunctionComponent<NavigationProps> = ({
  className,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={className}>
      {/* Team emblem section */}
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Box
              display="flex"
              justifyContent="flx-start"
              alignItems="center"
              py={1.5}
            >
              <Box minWidth={100}>
                <RouteLink to="/">
                  <Logo />
                </RouteLink>
              </Box>

              {/* Example of submenu - should be factored out */}
              <Button
                color="primary"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Box color="white">About KCSA</Box>
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
                <MenuItem
                  onClick={handleClose}
                  component={RouteLink}
                  to="/overview"
                >
                  Overview
                </MenuItem>

                <MenuItem
                  onClick={handleClose}
                  component={RouteLink}
                  to="/president"
                >
                  President
                </MenuItem>

                <MenuItem
                  onClick={handleClose}
                  component={RouteLink}
                  to="/contact"
                >
                  Contact us
                </MenuItem>
              </Menu>

              <Button component={RouteLink} to="/announcement">
                announcement
              </Button>

              <Button component={RouteLink} to="/league">
                League
              </Button>
              <Button component={RouteLink} to="/Teams">
                Teams
              </Button>

              <Box ml="auto">
                <Button component={RouteLink} to={"/login"} color="secondary">
                  Captain Login
                </Button>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export const Navigation = withTheme(styled(UnstyledNavigation)`
  .MuiButton-contained {
    box-shadow: none;
  }
`);
