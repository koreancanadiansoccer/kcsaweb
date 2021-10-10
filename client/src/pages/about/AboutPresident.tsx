import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { President } from "../../components/about/President";

interface AboutPresidentProps {
  className?: string;
}

/**
 * About Page.
 */
const UnstyledAboutPresident: FunctionComponent<AboutPresidentProps> = ({
  className,
}) => {
  return (
  <>
  <President/>
  </>);
};

export const AboutPresident = withTheme(styled(UnstyledAboutPresident)``);
