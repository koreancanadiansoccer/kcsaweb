import React, { FunctionComponent } from "react";
import TextField, { OutlinedTextFieldProps } from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";

// This interface is empty since no overrides needed, but can be added in future use.
interface InputProps extends OutlinedTextFieldProps {}

/**
 * Base input component.
 * Overrides default MUI textfield.
 * @param props
 */
const UnStyledInput: FunctionComponent<InputProps> = (props) => {
  const {
    children,
    className,
    color = "primary",
    variant = "outlined",
    ...otherProps
  } = props;

  const textProps = {
    className,
    color,
    variant,
    ...otherProps,
  };
  return (
    <Box my={2}>
      <TextField {...textProps}>{children}</TextField>
    </Box>
  );
};

export const Input = withTheme(styled(UnStyledInput)``);
