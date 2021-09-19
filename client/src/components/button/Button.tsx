import React, { FunctionComponent } from "react";
import OrigButton, {
  ButtonProps as OrigButtonProps,
} from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";

interface ButtonProps extends OrigButtonProps {
  component?: React.ReactNode;
  to?: string;
}

/**
 * Button
 * Overrides original MUI Button component.
 */
const UnstyledButton: FunctionComponent<ButtonProps> = (props) => {
  const {
    children,
    className,
    disableRipple = true,
    size = "medium",
    color = "primary",
    variant = "contained",
    component,
    to,
    ...otherProps
  } = props;

  const btnProps = {
    className,
    disableRipple,
    size,
    color,
    variant,
    component,
    to,
    ...otherProps,
  };

  return (
    <Box mx={1}>
      <OrigButton {...btnProps}>{children}</OrigButton>
    </Box>
  );
};

export const Button = withStyles(() => ({
  root: {
    borderRadius: "8px",
  },
}))(UnstyledButton);

/**
 * Simple wrapper for message button color.
 */
export const MessageButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: deepOrange["A200"],
    "&:hover": {
      backgroundColor: deepOrange["A200"],
    },
  },
}))(Button);
