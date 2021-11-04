import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import includes from 'lodash/includes';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider, useQuery } from '@apollo/client';
import { Switch, Route, useLocation } from 'react-router-dom';

import { Navigation } from './components/navigation/Navigation';
import { Footer } from './components/footer/Footer';
import { Loader } from './components/loader/Loader';
import { Home } from './pages/Home';
import { Admin } from './admin/Admin';
import { About } from './pages/About';
import { Announcements } from './pages/announcement/news_notice/Announcement';
import { League } from './pages/League';
import { Team } from './pages/Team';
import { TeamEdit } from './pages/TeamEdit';
import { createAppTheme } from './styles/theme';
import { client } from './graphql/client';
import { Login } from './pages/Login';
import { Create } from './pages/Create';
import { RegisterTeam } from './pages/RegisterTeam';
import { Media } from './pages/announcement/media/Media';
import { GET_HOME_VIEWER } from './graphql/homeViewer';
import { ViewerContext } from './context/homeViewer';
import { GalleryDetail } from './components/gallery_detail/GalleryDetail';
import { HomeViewer, generateLeagueDataByAge } from './types/home_viewer';

const App: FunctionComponent = () => {
  const theme = createAppTheme();
  const { pathname } = useLocation();
  const [viewer, setViewer] = useState<HomeViewer>();
  const isAdminRoute = useMemo(() => includes(pathname.split('/'), 'admin'), [
    pathname,
  ]);

  /**BELOW QUERY IS EXMAPLE TO SHOW CONNETION BETWEEN GQL AND FRONTEND - TODO: REMOVE */
  const { loading, data } = useQuery(GET_HOME_VIEWER, { client: client });

  useEffect(() => {
    if (!loading && data) {
      const homeViewerData = data.getHomeViewer;

      const {
        leagueAgeKeys,
        leagueTeamGroupAge,
        leaguePlayersGroupAge,
        matchesByAge,
        leagueTeams,
        leagueActive,
        matches,
      } = generateLeagueDataByAge(homeViewerData.leagues);

      setViewer({
        user: homeViewerData.user,
        announcements: homeViewerData.announcements,
        galleries: homeViewerData.galleries,
        leagues: homeViewerData.leagues,
        leagueAgeKeys,
        leagueTeamGroupAge,
        leaguePlayersGroupAge,
        matchesByAge,
        matches,
        leagueTeams,
        leagueActive,
      });
    }
  }, [loading, data]);

  // TODO: Update to better loader
  if (loading || !viewer) return <Loader open={loading} />;

  return (
    <ViewerContext.Provider value={{ viewer, setViewer }}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isAdminRoute && <Navigation />}

          <Switch>
            {/* ADMIN ROUTE */}
            {/* This route should be guarded for admin access only!! */}
            <Route path="/admin">
              <Admin />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>

            {/* About section */}
            <Route
              path={['/overview', '/president', '/contact']}
              component={About}
            />

            {/* This might be broken into per season */}
            <Route path="/league/:id">
              <League />
            </Route>

            {/* This might be broken into per season */}
            <Route path="/teams/:id">
              <Team />
            </Route>

            <Route path="/teamedit/:id">
              <TeamEdit />
            </Route>

            <Route exact path="/announcement">
              <Announcements />
            </Route>

            <Route path="/announcement/:id">
              <Announcements />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/create">
              <Create />
            </Route>

            <Route path="/registerteam">
              <RegisterTeam />
            </Route>

            <Route exact path="/gallery">
              <Media />
            </Route>

            <Route path="/gallery/:id">
              <GalleryDetail />
            </Route>
          </Switch>

          {!isAdminRoute && <Footer />}
        </ThemeProvider>
      </ApolloProvider>
    </ViewerContext.Provider>
  );
};

export default App;
