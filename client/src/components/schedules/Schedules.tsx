import React, {
  FunctionComponent,
  useState,
  useRef,
  useContext,
  useMemo,
  useLayoutEffect,
} from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';
import reduce from 'lodash/reduce';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';
import ScrollContainer from 'react-indiana-drag-scroll';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { Match } from '../../types/match';
import { ViewerContext } from '../../context/homeViewer';
import { LeagueSelect } from '../league_select/LeagueSelect';

import { ScheduleCard } from './components/schedule_card/ScheduleCard';
import { ScheduleDefaultCard } from './components/schedule_card/ScheduleDefaultCard';

dayjs.extend(isBetween);

interface SchedulesProps {
  className?: string;
}
// Default schedule card size - width + padding+margin) - This should not change.
const CardW = 380;

/**
 * Schedule section shown on home page.
 */
const UnstyledSchedules: FunctionComponent<SchedulesProps> = ({
  className,
}) => {
  const { viewer } = useContext(ViewerContext);
  // const matches = viewer.matchesByAge;

  // console.log(matches);
  if (!viewer.matches) {
    return <Box>No matches scheduled yet</Box>;
  }

  const ref = useRef<HTMLDivElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [paddingLeft, setPaddingLeft] = useState(0);
  const [leagueAgeType, setLeagueAgeType] = useState(
    viewer.leagueAgeKeys ? viewer.leagueAgeKeys[0] : 'OPEN'
  );

  // Filter matches by two weeks time.
  const matchesInTwoWeeks = useMemo(() => {
    // Get dates.
    const today = dayjs();
    const weekbefore = dayjs(today).subtract(1, 'week');
    const weekafter = dayjs(today).add(1, 'week');

    const matchSortedFilteredTwoWeeks = reduce(
      viewer.matchesByAge,
      (result: { [key: string]: Match[] }, matches, key) => {
        // First, sort matches by dates.
        const sortedMatchesByDate = matches.sort((a, b) =>
          dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
        );

        // Filter out all other matches that doesn't fall in 2-weeks frame.
        // eg; We want all matches within:
        //  Last week <-> Today <-> Nextweek.
        const filtered = filter(sortedMatchesByDate, (match) => {
          return dayjs(match.date).isBetween(
            weekbefore,
            weekafter,
            'day',
            '[)'
          );
        });
        result[key] = filtered;
        return result;
      },
      {}
    );
    return matchSortedFilteredTwoWeeks;
  }, [viewer.matchesByAge]);

  // Matches data for selected age group.
  const selectedAgeMatches = useMemo(() => {
    if (matchesInTwoWeeks) {
      return matchesInTwoWeeks[leagueAgeType];
    }
  }, [leagueAgeType, matchesInTwoWeeks]);

  // Counds for past week games - gets used to scroll on render so we see upcoming games first.
  const countPastWeekGames = useMemo(() => {
    let counts = 0;
    if (selectedAgeMatches) {
      counts = filter(selectedAgeMatches, (match) =>
        dayjs(match.date).isBefore(dayjs())
      ).length;
    }

    return counts;
  }, [selectedAgeMatches]);

  useLayoutEffect(() => {
    function updateSize() {
      if (ref.current && containerRef.current) {
        const computedStyle = window.getComputedStyle(containerRef.current);
        const marginLeft = parseFloat(computedStyle.marginLeft);
        const paddingLeft = parseFloat(computedStyle.paddingLeft);

        const totalLeftToPad = marginLeft + paddingLeft;

        /**
         * This is calculated by getting the marginLeft and paddingLeft value of the title of this section.
         * The goal is to match the alignment of scrollable section with other parts within this component.
         */
        setPaddingLeft(totalLeftToPad);

        /**
         * On initial render, we need to show the upcoming game by default.
         *
         * So we are scrolling to the amount of total width of
         *  schedule card(width + horizontal paddings + horizontal margins) times the number of pastweek games.
         */
        ref.current.scrollLeft = CardW * countPastWeekGames;
      }
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, [selectedAgeMatches, matchesInTwoWeeks, countPastWeekGames]);

  return (
    <>
      <Box className={className}>
        <Box className="schedules-container" py={3}>
          <Container ref={containerRef}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              {/* League selection */}
              <Box display="flex">
                {map(viewer.leagueAgeKeys, (leagueAge) => (
                  <Box key={`home-league-matches-selection-${leagueAge}`}>
                    <LeagueSelect
                      title={leagueAge}
                      selected={leagueAgeType === leagueAge}
                      onClick={() => setLeagueAgeType(leagueAge)}
                    />
                  </Box>
                ))}
              </Box>

              <Box display="flex" mt={4}>
                <Box className="text-main">Next match schedule</Box>
              </Box>
            </Box>
          </Container>

          {/* Scrollable schedule section */}
          <ScrollContainer
            className="schedules-card-container"
            innerRef={ref}
            style={{ paddingLeft: paddingLeft }}
          >
            {!selectedAgeMatches || selectedAgeMatches.length === 0
              ? map([1, 2, 3, 4], (numb) => {
                  return (
                    <Box key={`default-shceudle-card-${numb}`} id="test">
                      <motion.div
                        initial={{ opacity: 0, x: -50, y: -50 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{
                          delay: numb * 0.2,
                        }}
                      >
                        <ScheduleDefaultCard />
                      </motion.div>
                    </Box>
                  );
                })
              : map(selectedAgeMatches, (selectedMatch, idx) => (
                  <Box
                    key={`sched-${selectedMatch.id}`}
                    className="scheudle-card"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -50, y: -50 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{
                        delay: idx * 0.2,
                      }}
                    >
                      <ScheduleCard
                        date={selectedMatch.date}
                        location={selectedMatch.location}
                        homeTeam={selectedMatch.homeTeam}
                        awayTeam={selectedMatch.awayTeam}
                        status={selectedMatch.status}
                        pastGame={dayjs(selectedMatch.date).isBefore(dayjs())}
                      />
                    </motion.div>
                  </Box>
                ))}
          </ScrollContainer>
        </Box>
      </Box>
    </>
  );
};

export const Schedules = withTheme(styled(UnstyledSchedules)`
  .league-selector {
    cursor: pointer;
  }

  .schedules-container {
    background-color: rgba(225, 238, 246, 0.2);
    font-weight: 700;
  }

  .schedules-card-container {
    display: flex;
    justify-content: start;
    margin-top: 2rem;
    padding: 1rem 1rem;

    div {
      scroll-snap-align: center;
    }

    mask-image: linear-gradient(
      transparent,
      black 20%,
      black 80%,
      transparent 100%
    );

    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 20%,
      black 80%,
      transparent 100%
    );
  }

  .scheudle-card: last-child {
    padding-right: 100%;
  }
`);
