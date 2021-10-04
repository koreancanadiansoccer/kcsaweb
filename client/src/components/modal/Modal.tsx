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

interface ModalProps extends Pick<DialogProps, 'open' | 'onClose'> {
  title: string;
  className?: string;
}

export const UnstyledModal: FunctionComponent<ModalProps> = ({
  open,
  title,
  children,
  className,
  onClose,
}) => {
  return (
    <Dialog
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
