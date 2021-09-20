import React, { FunctionComponent } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link as RouteLink } from "react-router-dom";

import { Button } from "../button/Button";
import { Logo } from "../icons/Logo";
import { AboutNav } from "./components/AboutNav";
import { TeamsNav } from "./components/TeamsNav";

interface NavigationProps {
  className?: string;
}

const UnstyledNavigation: FunctionComponent<NavigationProps> = ({
  className,
}) => {
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
              <AboutNav />

              <Button component={RouteLink} to="/announcement">
                announcement
              </Button>

              <Button component={RouteLink} to="/league">
                League
              </Button>

              <TeamsNav />

              <Box ml="auto">
                <Button component={RouteLink} to={"/login"} color="secondary">
                  Team Login
                </Button>
              </Box>
            </Box>
          </Container>
        </Toolbar>
        <Box display='flex' sx={{ justifyContent: 'flex-end' }}>
          <Link title="Login" link="/login" />
        </Box>
      </AppBar>
    </Box>
  );
};

export const Navigation = withTheme(styled(UnstyledNavigation)`
  .MuiButton-contained {
    box-shadow: none;
  }
`);
