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
import { useQuery, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

import { LeagueContext } from '../../context/league';
import { Button } from '../button/Button';
import { Match } from '../../types/match';

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

  const [selectedMatch, setSelectedMatch] = useState<Match>();

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
      {openModal === MODAL_TYPE.EDIT_MATCH && selectedMatch && (
        <EditMatchModal
          fullScreen={true}
          selectedMatch={selectedMatch}
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
          return (
            <Accordion className="accoridon-container" key={`match-day-${key}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="boldText">{`Match Day ${key} - ${dayjs(
                  matchDayDate,
                  'YYYY-MM-DDTHH:mm'
                ).format('YYYY-MMM-DD')}`}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                {/* List of games for match */}
                {map(matchByDay, (match) => (
                  <Box width="100%" key={`match-${match.id}`}>
                    <Box
                      className="match-container"
                      p={1}
                      my={2}
                      onClick={() => {
                        setOpenModal(MODAL_TYPE.EDIT_MATCH);
                        setSelectedMatch(match);
                      }}
                    >
                      <Typography className="boldText">
                        {dayjs(match.date, 'YYYY-MM-DDTHH:mm').format(
                          'YYYY-MMM-DD hh:mmA'
                        )}
                      </Typography>

                      <Typography>Location: {match.location}</Typography>

                      <Box>
                        <Typography>{match.homeTeam.name}</Typography>
                      </Box>

                      <Box>
                        <Typography>{match.awayTeam.name}</Typography>
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
    border: 1px solid black;
    border-radius: 1rem;
    cursor: pointer;
  }
`);
