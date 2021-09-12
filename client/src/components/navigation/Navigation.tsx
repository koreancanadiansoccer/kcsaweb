import React, { FunctionComponent } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";

import { Link } from "./components/Link";
import { CircleGreyIcon } from "../icons/CircleGreyIcon";
import KcsaLogo from "../../assets/kcsa_logo.png";

interface NavigationProps {
  className?: string;
}

export const UnstyledNavigation: FunctionComponent<NavigationProps> = ({
  className,
}) => {
  return (
    <Box className={className}>
      {/* Team emblem section */}
      <Container className="nav-container">
        <Box display="flex" justifyContent="flex-end" py={2}>
          <Box display="flex" justifyContent="flex-end" mr="auto">
            <CircleGreyIcon />
            <CircleGreyIcon />
            <CircleGreyIcon />
            <CircleGreyIcon />
          </Box>
          <CircleGreyIcon />
          <CircleGreyIcon />
          <CircleGreyIcon />
          <CircleGreyIcon />
        </Box>
      </Container>

      <AppBar position="static">
        <Toolbar>
          <Container className="nav-container">
            <Box display="flex" justifyContent="center">
              <Box display="flex" justifyContent="flex-end" mr="auto">
                <Link title="About" />

                <Link title="League" />
              </Box>
              <Box width={5} className="kcsa-logo">
                <Box className="logo" />
              </Box>

              <Link title="Teams" />

              <Link title="Sponsors" />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export const Navigation = withTheme(styled(UnstyledNavigation)`
  // This might need to change for different window width
  .nav-container {
    padding-left: 300px;
    padding-right: 300px;
  }

  .kcsa-logo {
    position: absolute;
    width: 124px;
    height: 124px;
    background-color: white;
    box-shadow: inset 4px 4px 5px 2px rgba(79, 133, 160, 0.32);
    border-radius: 50%;
    top: -30px;

    .logo {
      background-image: url(${KcsaLogo});
      width: 105px;
      height: 105px;
      margin: 0 auto;
      margin-top: 9px;
    }
  }
`);
