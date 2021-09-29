import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
} from "react";
import { DialogProps } from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import styled from "styled-components";
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import TextField from '@material-ui/core/TextField';

import { Modal } from '../modal/Modal';
import { Button } from '../button/Button';