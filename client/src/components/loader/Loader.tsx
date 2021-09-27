import React, { FunctionComponent } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

interface LoaderProps {
  open: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({ open }) => (
  <Backdrop open={open} style={{ color: "white", zIndex: 1500 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);
