import React, { FunctionComponent } from "react";
import { withTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { Contact } from "../../components/about/Contact";

interface AboutContactProps {
  className?: string;
}

/**
 * About Page.
 */
const UnstyledAboutContact: FunctionComponent<AboutContactProps> = ({
  className,
}) => {
  return (<>
    <Contact />
  </>
    );
};

export const AboutContact = withTheme(styled(UnstyledAboutContact)``);