import React, {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';

import { Modal } from '../../../../components/modal/Modal';
import { Button } from '../../../../components/button/Button';
import { Match, MatchStatus } from '../../../../types/match';
import { MatchPlayer } from '../../../../types/player';
import { LeagueContext } from '../../../../context/league';
import {
  UpdateMatchResult,
  UpdateMatchInput,
  UPDATE_MATCH,
} from '../../../../graphql/match/updateMatch';
import { parseError } from '../../../../graphql/client';

import { MatchTeam, TeamType } from './components/MatchTeam';

interface EditMatchModalProps
  extends Pick<DialogProps, 'open' | 'onClose' | 'fullScreen'> {
  selectedMatchId: number;
}

/**
 * Edit Match modal.
 */
export const EditMatchModal: FunctionComponent<EditMatchModalProps> = ({
  selectedMatchId,
  open,
  onClose,
  fullScreen,
}) => {
  const { league: origLeague, setLeague: setOrigLeague } = useContext(
    LeagueContext
  );

  const origMatch = useMemo(() => {
    const match = find(
      origLeague.matches,
      (origMatch) => origMatch.id === selectedMatchId
    );

    return match;
  }, [selectedMatchId, origLeague]);

  const [updateMatchMut] = useMutation<UpdateMatchResult, UpdateMatchInput>(
    UPDATE_MATCH
  );

  if (!origMatch) {
    return <div>please try again</div>;
  }
  const [match, setMatch] = useState<Match>(origMatch);

  const hasNoChanges = useMemo(() => {
    return isEqual(match, origMatch);
  }, [match, origMatch]);

  const homeTeamScore = useMemo(() => {
    let score = 0;

    forEach(match.homeTeam.matchPlayers, (homePlayer) => {
      score += homePlayer.goalScored;
    });

    return score;
  }, [match]);

  const awayTeamScore = useMemo(() => {
    let score = 0;

    forEach(match.awayTeam.matchPlayers, (awayPlayer) => {
      score += awayPlayer.goalScored;
    });

    return score;
  }, [match]);

  const attentionRequired = useMemo(() => {
    return (
      origMatch.awayTeamNoGameSheet ||
      origMatch.awayTeamNoShow ||
      origMatch.awayTeamPhysical ||
      origMatch.homeTeamNoGameSheet ||
      origMatch.homeTeamNoShow ||
      origMatch.homeTeamPhysical
    );
  }, [origMatch]);

  // Update list
  useEffect(() => {
    setMatch(origMatch);
  }, [origMatch]);

  const handlePlayerUpdate = useCallback(
    (team: TeamType, players: MatchPlayer[]) => {
      const teamUpdate = { ...match[team] };
      teamUpdate.matchPlayers = players;

      setMatch({ ...match, [team]: teamUpdate });
    },
    [match, setMatch]
  );

  const updateMatch = useCallback(async () => {
    try {
      const res = await updateMatchMut({
        variables: {
          updateMatch: {
            ...match,
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore,
          },
        },
      });

      if (res.data?.updateMatch) {
        setOrigLeague(res.data?.updateMatch);
        // const origLeagueMatches = [...origLeague.matches];
        // const updatedMatchIdx = findIndex(
        //   origLeagueMatches,
        //   (origMatch) => origMatch.id === res.data?.updateMatch.id
        // );

        // origLeagueMatches[updatedMatchIdx] = res.data?.updateMatch;
        // setOrigLeague({ ...origLeague, matches: origLeagueMatches });
      }
    } catch (e) {
      console.error(e);
    }
  }, [
    updateMatchMut,
    homeTeamScore,
    awayTeamScore,
    match,
    origLeague,
    setOrigLeague,
  ]);

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
      <Box>
        {match.status === MatchStatus.COMPLETE && (
          <Chip
            label={`${match.status}`}
            style={{
              backgroundColor: 'seagreen',
              color: 'white',
            }}
          />
        )}

        {match.status === MatchStatus.PENDING && (
          <Chip label={`${match.status}`} disabled />
        )}

        {match.status === MatchStatus.MISMATCH && (
          <Chip
            label={`${match.status} On team submissions`}
            color="secondary"
            style={{
              color: 'white',
            }}
          />
        )}

        {attentionRequired && (
          <Chip
            label="Attention Required - Special event"
            style={{
              backgroundColor: 'red',
              color: 'white',
            }}
          />
        )}
      </Box>
      <Box
        width="100%"
        my={2}
        display="flex"
        justifyContent="space-betwen"
        ml={3}
      >
        {/* Home Team */}
        <Box mr={15}>
          <Box mb={3}>
            <Typography variant="h5" className="boldText">
              Home
            </Typography>
          </Box>

          <Typography variant="h6" className="boldText">
            {match.homeTeam.team.name}
          </Typography>

          <Box mb={3}>
            <Typography variant="body1">Home Team Score:</Typography>
            <Typography variant="body1">{homeTeamScore}</Typography>
          </Box>

          <Box mb={1}>
            <Typography variant="body1" className="boldText">
              Players:
            </Typography>
            <Typography variant="body2" color="error">
              {'*To add new player, please use League -> CLUBS modal'}
            </Typography>
          </Box>

          {/* List of Home team player section */}
          <MatchTeam
            matchPlayers={match.homeTeam.matchPlayers}
            teamType={TeamType.HOME}
            handlePlayerUpdate={handlePlayerUpdate}
          />

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
              Away
            </Typography>
          </Box>

          <Typography variant="h6" className="boldText">
            {match.awayTeam.team.name}
          </Typography>

          <Box mb={3}>
            <Typography variant="body1">Away Team Score:</Typography>
            <Typography variant="body1">{awayTeamScore || 0}</Typography>
          </Box>

          <Box mb={1}>
            <Typography variant="body1" className="boldText">
              Players:
            </Typography>
            <Typography variant="body2" color="error">
              {'*To add new player, please use League -> CLUBS modal'}
            </Typography>
          </Box>

          {/* List of Away team player section */}
          <MatchTeam
            matchPlayers={match.awayTeam.matchPlayers}
            teamType={TeamType.AWAY}
            handlePlayerUpdate={handlePlayerUpdate}
          />

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

      <Divider />

      <Box mt={3}>
        <Button
          disabled={hasNoChanges}
          size="large"
          onClick={() => void updateMatch()}
        >
          Update
        </Button>
      </Box>
    </Modal>
  );
};
