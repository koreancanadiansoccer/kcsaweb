import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Grey from '@material-ui/core/colors/grey';
import Chip from '@material-ui/core/Chip';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';

import { LeagueContext } from '../../context/league';
import { Button } from '../button/Button';
import { Match, MatchStatus } from '../../types/match';

import { AddMatchModal } from './modals/AddMatchModal';
import { EditMatchModal } from './modals/EditMatchModal';

dayjs.extend(customParseFormat);

enum MODAL_TYPE {
  CREATE_MATCH = 'CREATE_MATCH',
  EDIT_MATCH = 'EDIT_MATCH',
}

interface LeagueMatchProps {
  className?: string;
}

/**
 * Show and allow update to matches associated with league.
 */
const UnstyledLeagueMatch: FunctionComponent<LeagueMatchProps> = ({
  className,
}) => {
  const { league: origLeague, setLeague: setOrigLeague } = useContext(
    LeagueContext
  );

  const [openModal, setOpenModal] = useState<MODAL_TYPE | null>(null);

  const [matches, setMatches] = useState<Match[]>(origLeague.matches);

  const [selectedMatchId, setSelectedMatchId] = useState<number>();

  const matchesGroupDay = useMemo(() => {
    // Order by time.
    return groupBy(matches, (match) => match.matchDay);
  }, [matches]);

  useEffect(() => {
    setMatches(origLeague.matches);
  }, [origLeague]);

  // Get Matches for this league.
  return (
    <>
      {openModal === MODAL_TYPE.CREATE_MATCH && (
        <AddMatchModal
          open={openModal === MODAL_TYPE.CREATE_MATCH}
          onClose={() => setOpenModal(null)}
        />
      )}

      {/* Adding players to league team */}
      {openModal === MODAL_TYPE.EDIT_MATCH && selectedMatchId && (
        <EditMatchModal
          fullScreen={true}
          selectedMatchId={selectedMatchId}
          open={openModal === MODAL_TYPE.EDIT_MATCH}
          onClose={() => setOpenModal(null)}
        />
      )}

      <Box className={className}>
        League Match
        <Box my={3}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(MODAL_TYPE.CREATE_MATCH)}
            color="secondary"
          >
            Add Match
          </Button>
        </Box>
        {map(matchesGroupDay, (matchByDay, key) => {
          const matchDayDate = matchByDay[0].date;

          const count = useMemo(() => {
            let i = 0;
            forEach(matchByDay, (match) => {
              if (
                match.awayTeamNoGameSheet ||
                match.awayTeamNoShow ||
                match.awayTeamPhysical ||
                match.homeTeamNoGameSheet ||
                match.homeTeamNoShow ||
                match.homeTeamPhysical
              ) {
                i++;
              }
            });

            return i;
          }, [matchByDay]);

          return (
            <Accordion className="accoridon-container" key={`match-day-${key}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box>
                  <Typography className="boldText">{`Match Round ${key} - ${dayjs(
                    matchDayDate,
                    'YYYY-MM-DDTHH:mm'
                  ).format('YYYY-MMM-DD')}`}</Typography>

                  {count > 0 && (
                    <Box my={1}>
                      <Chip
                        label={`${count} match with special events`}
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                {/* List of games for match */}
                {map(matchByDay, (match) => (
                  <Box width="100%" key={`match-${match.id}`}>
                    <Box
                      className="match-container"
                      p={2}
                      my={2}
                      onClick={() => {
                        setOpenModal(MODAL_TYPE.EDIT_MATCH);
                        setSelectedMatchId(match.id);
                      }}
                    >
                      <Typography className="boldText">
                        {dayjs(match.date, 'YYYY-MM-DDTHH:mm').format(
                          'YYYY-MMM-DD hh:mmA'
                        )}
                      </Typography>
                      <Typography>Location: {match.location}</Typography>

                      <Box display="flex" my={2}>
                        <Box mr={2} display="flex">
                          <Typography className="boldText">
                            {match.homeTeam.name}
                          </Typography>

                          <Box ml={1}>
                            <Typography>{match.homeTeamScore}</Typography>
                          </Box>
                        </Box>
                        vs
                        <Box ml={2} display="flex">
                          <Box mr={1}>
                            <Typography>{match.awayTeamScore}</Typography>
                          </Box>

                          <Typography className="boldText">
                            {match.awayTeam.name}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Indicator section */}
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

                        {(match.awayTeamNoGameSheet ||
                          match.awayTeamNoShow ||
                          match.awayTeamPhysical ||
                          match.homeTeamNoGameSheet ||
                          match.homeTeamNoShow ||
                          match.homeTeamPhysical) && (
                          <Chip
                            label="Attention Required - Special event"
                            style={{
                              backgroundColor: 'red',
                              color: 'white',
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </>
  );
};

export const LeagueMatch = withTheme(styled(UnstyledLeagueMatch)`
  .match-container {
    // border: 1px solid #5a738175;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: 0 4px 12px 5px ${Grey[300]};
  }
`);
