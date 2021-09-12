import React, { FunctionComponent } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider } from "@apollo/client";

import { Navigation } from "./components/navigation/Navigation";

import { Home } from "./pages/Home";
import { createAppTheme } from "./styles/theme";
import { client } from "./graphql/client";

const App: FunctionComponent = () => {
  const theme = createAppTheme();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Home />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
