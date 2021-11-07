import React, { FunctionComponent, useCallback, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Button } from '../button/Button';
import { Logo } from '../icons/Logo';
// import { LogoNew } from '../icons/LogoNew'; TBD to use
import { ViewerContext } from '../../context/homeViewer';
import { LOGOUT } from '../../graphql/users/logout.mutation';

import { AboutNav } from './components/AboutNav';
import { TeamsNav } from './components/TeamsNav';
import { AnnouncementNav } from './components/AnnouncementNav';
import { LeagueNav } from './components/LeagueNav';

interface NavigationProps {
  className?: string;
}

const UnstyledNavigation: FunctionComponent<NavigationProps> = ({
  className,
}) => {
  const { viewer } = useContext(ViewerContext);
  const [logoutMut] = useMutation(LOGOUT);
  const history = useHistory();

  const logout = useCallback(async () => {
    try {
      const res = await logoutMut();

      if (res) {
        history.replace({ pathname: '/', state: { reload: true } });
      }
    } catch (e) {
      console.error(e);
    }
  }, [viewer]);

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

              <LeagueNav />

              <TeamsNav />

              <Box ml="auto" display="flex">
                {viewer?.user && viewer?.user?.isAdmin && (
                  <Button component={RouteLink} to={'/admin'} color="secondary">
                    Admin Panel
                  </Button>
                )}

                {viewer?.user && !viewer?.user?.isAdmin && (
                  <Button
                    component={RouteLink}
                    to="/dashboard"
                    color="secondary"
                  >
                    Club Dashboard
                  </Button>
                )}

                {!viewer?.user && (
                  <Button component={RouteLink} to={'/login'} color="secondary">
                    Team Login
                  </Button>
                )}

                {viewer?.user && (
                  <Box ml={3}>
                    <Button onClick={logout} color="secondary">
                      Logout
                    </Button>
                  </Box>
                )}
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

  .MuiBox-root {
    font-weight: 700;
  }
`);
