import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import includes from 'lodash/includes';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider, useQuery } from '@apollo/client';
import { Switch, Route, useLocation } from 'react-router-dom';

import { Navigation } from './components/navigation/Navigation';
import { Loader } from './components/loader/Loader';
import { Home } from './pages/Home';
import { Admin } from './pages/admin/Admin';
import { AboutOverview } from './pages/about/AboutOverview';
import { Announcements } from './pages/news_notice/Announcement';
import { League } from './pages/League';
import { Team } from './pages/Team';
import { createAppTheme } from './styles/theme';
import { client } from './graphql/client';
import { Login } from './pages/Login';
import { Create } from './pages/create/Create';
import { GET_HOME_VIEWER } from './graphql/homeViewer';
import { ViewerContext } from './context/homeViewer';
import { HomeViewer } from './types/home_viewer';
//import { ScrollToTop } from './components/about/ScrollToTop';
const App: FunctionComponent = () => {
  const theme = createAppTheme();
  const { pathname } = useLocation();
  const [viewer, setViewer] = useState<HomeViewer>();
  const isAdminRoute = useMemo(
    () => includes(pathname.split('/'), 'admin'),
    [pathname]
  );

  /**BELOW QUERY IS EXMAPLE TO SHOW CONNETION BETWEEN GQL AND FRONTEND - TODO: REMOVE */
  const { loading, data } = useQuery(GET_HOME_VIEWER, { client: client });

  useEffect(() => {
    if (!loading && data) {
      setViewer(data.getHomeViewer);
    }
  }, [loading, data]);

  // TODO: Update to better loader
  if (loading) return <Loader open={loading} />;

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
              component={AboutOverview}
            />

            {/* This might be broken into per season */}
            <Route path="/league">
              <League />
            </Route>

            {/* This might be broken into per season */}
            <Route path="/teams/:id">
              <Team />
            </Route>

            <Route exact path="/announcement">
              <Announcements />
            </Route>

            <Route exact path="/announcement/:id">
              <Announcements />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </ThemeProvider>
      </ApolloProvider>
    </ViewerContext.Provider>
  );
};

export default App;
