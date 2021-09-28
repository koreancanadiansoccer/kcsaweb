import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
} from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { UserInput } from "../../types/user";

interface CreateProps {
  className?: string;
  onAdd: (user: UserInput) => Promise<void>;
}

/**
 *
 * Form to handle user addition
 */
const UnstyledCreate: FunctionComponent<CreateProps> = ({
  className,
  onAdd,
}) => {
  const [newUser, setNewUser] = useState<UserInput>({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const isValid = useMemo(
    () =>
      !!newUser?.name &&
      !!newUser?.password &&
      !!newUser?.email &&
      !!newUser?.phoneNumber,
    [newUser]
  );

  // Reset 'newUser' when closing/opening
  useEffect(
    () =>
      setNewUser({
        name: "",
        password: "",
        email: "",
        phoneNumber: "",
      }),
    []
  );

  return (
    <Box className={className} mt={20}>
      <Box>
        <Typography className="create-title" variant="h4" align="center">
          Create Captain
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Paper className="create-form">
          <Input
            className="create-field"
            type="text"
            label="Name:"
            value={newUser.name}
            fullWidth
            margin="normal"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewUser({
                ...newUser,
                name: evt.target.value,
              });
            }}
          />

          <Input
            className="create-field"
            type="password"
            label="Password:"
            value={newUser.password}
            fullWidth
            margin="normal"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewUser({
                ...newUser,
                password: evt.target.value,
              });
            }}
          />

          <Input
            className="create-field"
            type="email"
            label="Email:"
            value={newUser.email}
            fullWidth
            margin="normal"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewUser({
                ...newUser,
                email: evt.target.value,
              });
            }}
          />

          <Input
            className="create-field"
            type="text"
            label="Phone Number:"
            value={newUser.phoneNumber}
            fullWidth
            margin="normal"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewUser({
                ...newUser,
                phoneNumber: evt.target.value,
              });
            }}
          />

          <Box textAlign="center" mt={3}>
            <Button
              disabled={!isValid}
              size="large"
              variant="contained"
              color="primary"
              onClick={() => void onAdd(newUser)}
            >
              SIGN UP
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export const CreateUser = withTheme(styled(UnstyledCreate)`
  .login-title {
    font-size: 2em;
    font-weight: bold;
  }
  .create-form {
    padding: 20px;
    border: 2px solid rgba(142, 142, 147, 0.2);
  }
  .create-field {
    width: 500px;
  }
`);
