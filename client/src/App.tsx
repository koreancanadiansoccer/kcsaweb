import React, { FunctionComponent } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider } from "@apollo/client";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "./components/navigation/Navigation";

import { Home } from "./pages/Home";
import { AboutOverview } from "./pages/about/AboutOverview";
import { AboutPresident } from "./pages/about/AboutPresident";
import { AboutContact } from "./pages/about/AboutContact";
import { Announcement } from "./pages/Announcement";
import { League } from "./pages/League";
import { Team } from "./pages/Team";
import { createAppTheme } from "./styles/theme";
import { client } from "./graphql/client";

const App: FunctionComponent = () => {
  const theme = createAppTheme();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />

          <Navigation />

          <Switch>
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
            <Route path="/team">
              <Team />
            </Route>

            <Route path="/announcement">
              <Announcement />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
