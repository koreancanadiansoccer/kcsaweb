import React, { FunctionComponent, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link as RouteLink } from 'react-router-dom';

import { Button } from '../button/Button';
import { Logo } from '../icons/Logo';
// import { LogoNew } from '../icons/LogoNew'; TBD to use
import { ViewerContext } from '../../context/homeViewer';

import { AboutNav } from './components/AboutNav';
import { TeamsNav } from './components/TeamsNav';
import { AnnouncementNav } from './components/AnnouncementNav';

interface NavigationProps {
  className?: string;
}

const UnstyledNavigation: FunctionComponent<NavigationProps> = ({
  className,
}) => {
  const { viewer } = useContext(ViewerContext);

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

              <AnnouncementNav />

              <Button component={RouteLink} to="/league">
                League
              </Button>

              <TeamsNav />

              <Box ml="auto" display="flex">
                {viewer?.user && viewer?.user?.isAdmin && (
                  <Button component={RouteLink} to={'/admin'} color="secondary">
                    Admin Panel
                  </Button>
                )}

                {viewer?.user && !viewer?.user?.isAdmin && (
                  <Button component={RouteLink} to={'/login'} color="secondary">
                    Update Club
                  </Button>
                )}

                {!viewer?.user && (
                  <Button component={RouteLink} to={'/login'} color="secondary">
                    Team Login
                  </Button>
                )}

                {viewer?.user && <Button color="secondary">Logout</Button>}
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
