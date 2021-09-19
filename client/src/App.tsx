import React, { FunctionComponent, useMemo } from "react";
import includes from "lodash/includes";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider } from "@apollo/client";
import { Switch, Route, useLocation } from "react-router-dom";
import { Navigation } from "./components/navigation/Navigation";

import { Home } from "./pages/Home";
import { Admin } from "./pages/admin/Admin";
import { AboutOverview } from "./pages/about/AboutOverview";
import { AboutPresident } from "./pages/about/AboutPresident";
import { AboutContact } from "./pages/about/AboutContact";
import { Announcement } from "./pages/Announcement";
import { League } from "./pages/League";
import { Team } from "./pages/Team";
import { createAppTheme } from "./styles/theme";
import { client } from "./graphql/client";

import { Login } from "./pages/Login";
import { Create } from"./pages/create/Create"

const App: FunctionComponent = () => {
  const theme = createAppTheme();
  const { pathname } = useLocation();

  const isAdminRoute = useMemo(() => includes(pathname.split("/"), "admin"), [
    pathname,
  ]);

  return (
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
          <Route path="/overview">
            <AboutOverview />
          </Route>

          <Route path="/president">
            <AboutPresident />
          </Route>

          <Route path="/contact">
            <AboutContact />
          </Route>

          {/* This might be broken into per season */}
          <Route path="/league">
            <League />
          </Route>

          {/* This might be broken into per season */}
          <Route path="/teams/:id">
            <Team />
          </Route>

          <Route path="/announcement">
            <Announcement />
          </Route>

          {/*TODO: passport.authenticate 연결해서 cookies session 확인*/}
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/create">
            <Create />
          </Route>
        </Switch>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
