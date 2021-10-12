import React, {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  ChangeEvent,
  useContext,
  useCallback,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import map from 'lodash/map';
import find from 'lodash/find';
import pick from 'lodash/pick';
import findIndex from 'lodash/findIndex';
import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';

import { Modal } from '../../modal/Modal';
import { Button } from '../../button/Button';
import { Input } from '../../input/Input';
import { Match } from '../../../types/match';
import { LeagueContext } from '../../../context/league';

interface EditMatchModalProps
  extends Pick<DialogProps, 'open' | 'onClose' | 'fullScreen'> {
  selectedMatch: Match;
}

export const EditMatchModal: FunctionComponent<EditMatchModalProps> = ({
  selectedMatch,
  open,
  onClose,
  fullScreen,
}) => {
  const { league: origLeague, setLeague: setOrigLeague } = useContext(
    LeagueContext
  );

  const [match, setMatch] = useState<Match>(selectedMatch || []);

  // // Update list
  useEffect(() => {
    setMatch(selectedMatch || []);
  }, [selectedMatch]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      title={`Match Round ${match.matchDay} - ${match.homeTeam.name} vs ${
        match.awayTeam.name
      } - ${dayjs(match.date, 'YYYY-MM-DDTHH:mm').format(
        'YYYY-MMM-DD hh:mmA'
      )}`}
    >
      <Box width="100%" my={2} display="flex" justifyContent="space-betwen">
        {/* Home Team */}
        <Box>
          <Box mb={3}>
            <Typography variant="h5" className="boldText">
              Home Team
            </Typography>
          </Box>

          <Typography variant="h6">{match.homeTeam.name}</Typography>

          {/* List of Home team player section */}
          <Box border={1} display="flex" alignItems="center" p={1}>
            <Typography variant="body1">Stanley Moon</Typography>

            <Box mx={1}>
              <Input
                label="Goal"
                placeholder="Goals"
                value={2}
                type="number"
                margin="dense"
                size="small"
                style={{ width: 50 }}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  // setNewLeague({
                  //   ...newLeague,
                  //   maxYellowCard: parseInt(evt.target.value, 10),
                  // });
                }}
              />
            </Box>

            <Box mx={1}>
              <Input
                label="YellowCard"
                placeholder="Yellowcard"
                value={2}
                type="number"
                margin="dense"
                size="small"
                style={{ width: 100 }}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  // setNewLeague({
                  //   ...newLeague,
                  //   maxYellowCard: parseInt(evt.target.value, 10),
                  // });
                }}
              />
            </Box>
            <Box mx={1}>
              <Input
                label="G"
                placeholder="Yellowcard"
                value={2}
                type="number"
                margin="dense"
                size="small"
                style={{ width: 50 }}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  // setNewLeague({
                  //   ...newLeague,
                  //   maxYellowCard: parseInt(evt.target.value, 10),
                  // });
                }}
              />
            </Box>
          </Box>

          <Box mb={3}>
            <Typography variant="body1">Home Team Score:</Typography>
            <Typography variant="body1">{match.homeTeamScore || 0}</Typography>
          </Box>

          {/* Special occastion */}
          <Box display="flex" alignItems="center">
            <Typography variant="body1">Missed game sheet?</Typography>
            <Checkbox
              checked={match.homeTeamNoGameSheet}
              color="primary"
              onChange={() => {
                setMatch({
                  ...match,
                  homeTeamNoGameSheet: !match.homeTeamNoGameSheet,
                });
              }}
            />
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body1">Physical Altercation </Typography>
            <Checkbox
              checked={match.homeTeamPhysical}
              color="primary"
              onChange={() => {
                setMatch({
                  ...match,
                  homeTeamPhysical: !match.homeTeamPhysical,
                });
              }}
            />
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body1">No-show </Typography>
            <Checkbox
              checked={match.homeTeamNoShow}
              color="primary"
              onChange={() => {
                setMatch({ ...match, homeTeamNoShow: !match.homeTeamNoShow });
              }}
            />
          </Box>
        </Box>

        {/* Away team section */}
        <Box>
          <Box mb={3}>
            <Typography variant="h5" className="boldText">
              Away Team
            </Typography>
          </Box>

          <Typography variant="h6">{match.awayTeam.name}</Typography>

          <Box border={1} display="flex" alignItems="center" p={1}>
            <Typography variant="body1">Stanley Moon</Typography>

            <Box mx={1}>
              <Input
                label="Goal"
                placeholder="Goals"
                value={2}
                type="number"
                margin="dense"
                size="small"
                style={{ width: 50 }}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  // setNewLeague({
                  //   ...newLeague,
                  //   maxYellowCard: parseInt(evt.target.value, 10),
                  // });
                }}
              />
            </Box>

            <Box mx={1}>
              <Input
                label="YellowCard"
                placeholder="Yellowcard"
                value={2}
                type="number"
                margin="dense"
                size="small"
                style={{ width: 100 }}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  // setNewLeague({
                  //   ...newLeague,
                  //   maxYellowCard: parseInt(evt.target.value, 10),
                  // });
                }}
              />
            </Box>
            <Box mx={1}>
              <Input
                label="G"
                placeholder="Yellowcard"
                value={2}
                type="number"
                margin="dense"
                size="small"
                style={{ width: 50 }}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  // setNewLeague({
                  //   ...newLeague,
                  //   maxYellowCard: parseInt(evt.target.value, 10),
                  // });
                }}
              />
            </Box>
          </Box>

          <Box mb={3}>
            <Typography variant="body1">Away Team Score:</Typography>
            <Typography variant="body1">{match.homeTeamScore || 0}</Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body1">Missed game sheet?</Typography>
            <Checkbox
              checked={match.awayTeamNoGameSheet}
              color="primary"
              onChange={() => {
                setMatch({
                  ...match,
                  awayTeamNoGameSheet: !match.awayTeamNoGameSheet,
                });
              }}
            />
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body1">Physical Altercation </Typography>
            <Checkbox
              checked={match.awayTeamPhysical}
              color="primary"
              onChange={() => {
                setMatch({
                  ...match,
                  awayTeamPhysical: !match.awayTeamPhysical,
                });
              }}
            />
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body1">No-show </Typography>
            <Checkbox
              checked={match.awayTeamNoShow}
              color="primary"
              onChange={() => {
                setMatch({
                  ...match,
                  awayTeamNoShow: !match.awayTeamNoShow,
                });
              }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
