import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


interface LoginProps {
  className?: string;
}

/**
 * About Page.
 */
const UnstyledLogin: FunctionComponent<LoginProps> = ({
  className,
}) => {
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      direction='column'
      spacing={5}
    >
      <Grid item>
        <Typography variant='h5' color='primary'>
          Login
        </Typography>
      </Grid>

      <Grid item style={{ border: "0.2px solid gray" }}>
        <Grid container direction='column' alignItems='center' justify='center'>
          <TextField
            variant='filled'
            color='secondary'
            type="email"
            label="Email:"
            fullWidth
            style={{ marginBottom: '2em' }}
            placeholder="test@test.com"
          />

          <TextField
            variant='filled'
            color='secondary'
            type="password"
            label="Password:"
            fullWidth
            style={{ marginBottom: '2em' }}
          />

          <Button size="large" variant="contained" color='primary'>
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const Login = withTheme(styled(UnstyledLogin)``);
