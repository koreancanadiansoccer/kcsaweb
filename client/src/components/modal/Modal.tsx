import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';

interface ModalProps
  extends Pick<DialogProps, 'open' | 'onClose' | 'fullScreen'> {
  title: string;
  className?: string;
}
const Transition = React.forwardRef<unknown, SlideProps>(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const UnstyledModal: FunctionComponent<ModalProps> = ({
  open,
  fullScreen,
  title,
  children,
  className,
  onClose,
}) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      TransitionComponent={fullScreen ? Transition : undefined}
      open={open}
      onClose={onClose}
      className={className}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {title}

          <IconButton
            aria-label="close"
            onClick={() => {
              if (onClose) {
                onClose({}, 'backdropClick');
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {fullScreen && (
        <AppBar>
          <Toolbar>
            <IconButton
              aria-label="close"
              onClick={() => {
                if (onClose) {
                  onClose({}, 'backdropClick');
                }
              }}
            >
              <CloseIcon style={{ fill: 'white' }} />
            </IconButton>

            <Typography variant="h6">{title}</Typography>
          </Toolbar>
        </AppBar>
      )}

      <DialogContent dividers>
        <Box mt={2}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export const Modal = withTheme(styled(UnstyledModal)`
  .headerContent {
    background-color: white;
    display: flex;
    box-shadow: 0 8px 8px 0px ${Grey[300]};
  }
`);
