import React, { FunctionComponent, ChangeEvent } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import map from 'lodash/map';

import { MatchPlayer } from '../../../../../types/player';
import { Input } from '../../../../../components/input/Input';

export enum TeamType {
  HOME = 'homeTeam',
  AWAY = 'awayTeam',
}

interface MatchTeamProps {
  matchPlayers: MatchPlayer[];
  teamType: TeamType;
  handlePlayerUpdate: (team: TeamType, players: MatchPlayer[]) => void;
}

// Displaying away/home team section for edit match modal
export const MatchTeam: FunctionComponent<MatchTeamProps> = ({
  matchPlayers,
  teamType,
  handlePlayerUpdate,
}) => {
  return (
    <>
      {map(matchPlayers, (player, idx) => (
        <Box
          border={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
          key={`${player.name}-${idx}`}
        >
          <Box>
            <Typography variant="body1">{player.name}</Typography>
          </Box>

          <Box display="flex">
            <Box mx={1}>
              <Input
                label="Goal"
                placeholder="Goals"
                value={player.goalScored}
                type="number"
                margin="dense"
                size="small"
                style={{ width: 100 }}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  const matchPlayerTemp = [...matchPlayers];

                  matchPlayerTemp[idx] = {
                    ...matchPlayerTemp[idx],
                    goalScored: parseInt(evt.target.value, 10),
                  };

                  handlePlayerUpdate(teamType, matchPlayerTemp);
                }}
                inputProps={{ min: 0 }}
              />
            </Box>

            <Box mx={1}>
              <Input
                label="YellowCard"
                placeholder="Yellowcard"
                value={player.yellowCard}
                type="number"
                margin="dense"
                size="small"
                style={{ width: 100 }}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  const matchPlayerTemp = [...matchPlayers];

                  matchPlayerTemp[idx] = {
                    ...matchPlayerTemp[idx],
                    yellowCard: parseInt(evt.target.value, 10),
                  };

                  handlePlayerUpdate(teamType, matchPlayerTemp);
                }}
                inputProps={{ min: 0 }}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
