import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import GroupIcon from '@material-ui/icons/Group';
import {
  Switch,
  Route,
  useRouteMatch,
  Link as RouteLink,
} from 'react-router-dom';

import { Leagues } from './pages/Leagues';
import { LeagueDetail } from './pages/LeagueDetail';
import { Teams } from './pages/Teams';
import { TeamDetail } from './pages/TeamDetail';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

// Main Admin page container.
export const Admin = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          {/* Direct user to /invite */}
          <List>
            <ListItem component={RouteLink} to={`${url}/invite`} button>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Invite Captain" />
            </ListItem>

            {/* Direct user to /league */}
            <ListItem component={RouteLink} to={`${url}/league`} button>
              <ListItemIcon>
                <SportsSoccerIcon />
              </ListItemIcon>
              <ListItemText primary="League" />
            </ListItem>

            {/* Direct user to /teams */}
            <ListItem component={RouteLink} to={`${url}/teams`} button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Teams" />
            </ListItem>
          </List>

          <Divider />
        </div>
      </Drawer>

      <main className={classes.content}>
        <Toolbar />

        <Switch>
          <Route exact path={path}>
            <h3>Please select a menu.</h3>
          </Route>

          {/* Render page for /invite */}
          <Route path={`${url}/invite`}>
            <h3>Invite captains</h3>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
          </Route>

          {/* Render page for /league */}
          <Route exact path={`${url}/league`}>
            <Leagues />
          </Route>

          {/* Render page for /league/{id} - a page for specific league} */}
          <Route path={`${url}/league/:id`}>
            <LeagueDetail />
          </Route>

          {/* Render page for /teams */}
          <Route exact path={`${url}/teams`}>
            <Teams />
          </Route>

          {/* Render page for /team/{id} - a page for specific team} */}
          <Route path={`${url}/teams/:id`}>
            <TeamDetail />
          </Route>
        </Switch>
      </main>
    </div>
  );
};
