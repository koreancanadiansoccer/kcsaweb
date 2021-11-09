import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  withTheme,
  useTheme,
  createStyles,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Button } from '../button/Button';
import { ViewerContext } from '../../context/homeViewer';
import { LOGOUT } from '../../graphql/users/logout.mutation';
import LogoNew from '../../assets/logo_new.svg';

import { AboutNav, AboutMobileNav } from './components/AboutNav';
import { TeamsNav, TeamMobileNav } from './components/TeamsNav';
import {
  AnnouncementNav,
  AnnouncementMobileNav,
} from './components/AnnouncementNav';
import { LeagueNav, LeagueMobileNav } from './components/LeagueNav';

const drawerWidth = 240;

interface NavigationProps {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      color: 'white',
      fontSize: '1.5rem',
      textAlign: 'center',
      backgroundColor: theme.palette.primary.main,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const UnstyledNavigation: FunctionComponent<NavigationProps> = ({
  className,
}) => {
  const { viewer } = useContext(ViewerContext);
  const [logoutMut] = useMutation(LOGOUT);
  const history = useHistory();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const classes = useStyles();

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
  const handleDrawerOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (isMobile) {
    return (
      <Box className={className}>
        <CssBaseline />
        <AppBar position="static">
          <Box py={1}>
            <Toolbar className="toolbar-mobile">
              <Box minWidth={100}>
                <RouteLink to="/">
                  {/* <Logo /> */}
                  <img
                    src={LogoNew}
                    alt="color-logo-pic"
                    style={{ width: '70px' }}
                  />
                </RouteLink>
              </Box>
              <Box>
                {!viewer?.user && (
                  <Button component={RouteLink} to={'/login'} color="secondary">
                    Login
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

                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Box>

          <Drawer
            className={classes.drawer}
            anchor="right"
            open={mobileMenuOpen}
            onClose={handleDrawerOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <List>
              <AboutMobileNav onClose={handleDrawerOpen} />
              <AnnouncementMobileNav onClose={handleDrawerOpen} />
              <LeagueMobileNav onClose={handleDrawerOpen} />
              <TeamMobileNav onClose={handleDrawerOpen} />
              {viewer?.user && (
                <Box width="90%" mx={'auto'} mt={2}>
                  <Button onClick={logout} color="secondary" fullWidth>
                    Logout
                  </Button>
                </Box>
              )}
            </List>
          </Drawer>
        </AppBar>
      </Box>
    );
  }
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
                  <img
                    src={LogoNew}
                    alt="color-logo-pic"
                    style={{ width: '75px' }}
                  />
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
                    Login
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

  .toolbar-mobile {
    justify-content: space-between;
  }

  .MuiListItem-root {
    font-weight: 700;
    font-size: 2rem;
    color: white;
  }
`);
