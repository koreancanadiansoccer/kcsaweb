import React, { FunctionComponent, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ApolloProvider, useQuery } from "@apollo/client";

import { SummaryTable } from "./components/SummaryTable";
import { createAppTheme } from "./styles/theme";
import { client } from "./graphql/client";

const App = () => {
  const theme = createAppTheme();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              KCSA -
            </Typography>
          </Toolbar>
        </AppBar>

        <Box mt={20}>
          <Container maxWidth="md">
            <SummaryTable title="TEAM TABLE" />
            <Box mt={20}>
              <SummaryTable title="TOP SCORER" />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
