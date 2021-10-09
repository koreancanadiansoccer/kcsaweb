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

import { Modal } from '../../modal/Modal';
import { Input } from '../../input/Input';
import { Button } from '../../button/Button';
import { Select } from '../../select/Select';
import { LeagueInput, leagueTypeOptions } from '../../../types/league';
import { ageOptions } from '../../../types/age.enum';
import { formatYear } from '../../../utils/format';

interface AddLeagueModalProp extends Pick<DialogProps, 'open' | 'onClose'> {
  onAdd: (league: LeagueInput) => Promise<void>;
}

/**
 * Modal to handle league creation.
 */
export const AddLeagueModal: FunctionComponent<AddLeagueModalProp> = ({
  open,
  onClose,
  onAdd,
}) => {
  // Init state for new product.
  const [newLeague, setNewLeague] = useState<LeagueInput>({
    name: 'KCSA',
    leagueAgeType: '',
    leagueType: '',
    year: '',
    maxYellowCard: 0,
  });

  const isValid = useMemo(
    () =>
      !!newLeague?.name &&
      !!newLeague?.leagueType &&
      !!newLeague?.leagueAgeType &&
      !!newLeague?.year &&
      !!newLeague?.maxYellowCard,
    [newLeague]
  );

  // Reset 'newLeague' when closing/opening the modal.
  useEffect(
    () =>
      setNewLeague({
        name: '',
        leagueAgeType: '',
        leagueType: '',
        year: '',
        maxYellowCard: 0,
      }),
    [open]
  );

  return (
    <Modal open={open} onClose={onClose} title="Create New League">
      <Box>
        <Typography variant="body1"> League Name</Typography>

        <Box display="flex" justifyContent="space-around">
          <Input
            label="Name"
            placeholder="League name"
            required
            value={newLeague?.name}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewLeague({ ...newLeague, name: evt.target.value });
            }}
          />

          <Input
            label="Year"
            required
            value={newLeague?.year}
            fullWidth
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNewLeague({
                ...newLeague,
                year: formatYear(evt.target.value),
              });
            }}
          />
        </Box>
      </Box>

      <Divider />

      <Box my={2}>
        <Typography variant="body1"> League Age Group</Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box width="50%" my={2}>
            <Select
              options={ageOptions}
              isClearable
              createable
              handleChange={(option: any) => {
                setNewLeague({ ...newLeague, leagueAgeType: option?.value });
              }}
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box my={2}>
        <Typography variant="body1"> League Type</Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box width="50%" my={2}>
            <Select
              options={leagueTypeOptions}
              isClearable
              createable
              handleChange={(option: any) => {
                setNewLeague({ ...newLeague, leagueType: option?.value });
              }}
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box my={2}>
        <Typography variant="body1">
          Accumulated Yellow card for suspension
        </Typography>

        <Input
          label="Max YellowCard"
          placeholder="Yellowcard"
          required
          value={newLeague?.maxYellowCard}
          type="number"
          fullWidth
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setNewLeague({
              ...newLeague,
              maxYellowCard: parseInt(evt.target.value, 10),
            });
          }}
        />
      </Box>

      <Divider />

      <DialogActions>
        <Button
          disabled={!isValid}
          size="large"
          onClick={() => void onAdd(newLeague)}
        >
          Create
        </Button>
      </DialogActions>
    </Modal>
  );
};
