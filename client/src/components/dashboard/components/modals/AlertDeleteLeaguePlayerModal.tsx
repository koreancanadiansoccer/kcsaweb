import React, { FunctionComponent } from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { Modal } from '../../../../components/modal/Modal';
import { ErrorButton } from '../../../../components/button/Button';

interface AlertDeleteLeaguePlayerModalProp
  extends Pick<DialogProps, 'open' | 'onClose'> {
  deleteLeaguePlayerId: number;
  onDelete: (deleteLeaguePlayerId: number) => Promise<void>;
}

/**
 * Modal to handle team creation.
 */
export const AlertDeleteLeaguePlayerModal: FunctionComponent<AlertDeleteLeaguePlayerModalProp> =
  ({ open, onDelete, onClose, deleteLeaguePlayerId }) => {
    return (
      <Modal open={open} onClose={onClose} title="Delete Completed Match.">
        <Box>
          <Box my={2}>
            <Typography variant="body1">
              {
                "Match is in 'Complete' state. Are you sure you want to delete this match?"
              }
            </Typography>
          </Box>

          <Divider />

          <DialogActions>
            <ErrorButton
              size="large"
              onClick={() => void onDelete(deleteLeaguePlayerId)}
            >
              Delete
            </ErrorButton>
          </DialogActions>
        </Box>
      </Modal>
    );
  };
