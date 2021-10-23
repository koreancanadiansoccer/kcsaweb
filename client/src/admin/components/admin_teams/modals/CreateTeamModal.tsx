import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useMemo,
  useEffect,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import dayjs from 'dayjs';

import { Modal } from '../../../../components/modal/Modal';
import { Input } from '../../../../components/input/Input';
import { Button } from '../../../../components/button/Button';
import { TeamInput } from '../../../../types/team';
import { ageOptions } from '../../../../types/age.enum';
import { Select, ColorSelect } from '../../../../components/select/Select';
import { colorSelectOptions } from '../../../../utils/color';

interface CreateTeamModalProp extends Pick<DialogProps, 'open' | 'onClose'> {
  onAdd: (newTeam: TeamInput) => Promise<void>;
}

/**
 * Modal to handle team creation.
 */
export const CreateTeamModal: FunctionComponent<CreateTeamModalProp> = ({
  open,
  onClose,
  onAdd,
}) => {
  // Init state for new product.
  const [newTeam, setNewTeam] = useState<TeamInput>({
    name: '',
    teamAgeType: '',
    teamColor: '',
    foundedDate: dayjs().format('YYYY-MM'),
  });

  const isValid = useMemo(
    () =>
      !!newTeam?.name &&
      !!newTeam?.teamAgeType &&
      !!newTeam?.teamColor &&
      !!newTeam?.foundedDate,
    [newTeam]
  );

  // Reset 'newTeam' when closing/opening the modal.
  useEffect(
    () =>
      setNewTeam({
        name: '',
        teamAgeType: '',
        teamColor: '',
        foundedDate: dayjs().format('YYYY-MM'),
      }),
    [open]
  );

  return (
    <Modal open={open} onClose={onClose} title="Create New Club">
      <Box>
        <Box my={2}>
          <Typography variant="body1"> Club Name</Typography>
          <Input
            label="Name"
            placeholder="Club name"
            required
            value={newTeam?.name}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewTeam({ ...newTeam, name: evt.target.value });
            }}
          />
        </Box>

        <Divider />

        {/* Founded Date */}
        <Box my={2}>
          <Typography variant="body1"> Club Founded Date</Typography>
          <Input
            id="datetime-local"
            label="Match Time"
            value={newTeam?.foundedDate}
            type="month"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setNewTeam({ ...newTeam, foundedDate: e.target.value });
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Divider />

        {/* Team Age group */}
        <Box my={2}>
          <Typography variant="body1"> Club Age Group</Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            my={2}
          >
            <Box width="50%">
              <Select
                options={ageOptions}
                isClearable
                createable
                handleChange={(option: any) => {
                  setNewTeam({ ...newTeam, teamAgeType: option?.value });
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box my={2}>
          <Box width="100%">
            <Typography variant="body1"> Club Color</Typography>
            <Box width="50%">
              <ColorSelect
                options={colorSelectOptions}
                createable
                handleChange={(option: any) => {
                  setNewTeam({ ...newTeam, teamColor: option?.value });
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider />

        <DialogActions>
          <Button
            disabled={!isValid}
            size="large"
            onClick={() => void onAdd(newTeam)}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};
