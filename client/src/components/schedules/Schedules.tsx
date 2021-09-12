import React, { FunctionComponent, useState, useMemo } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import map from "lodash/map";
import ScrollContainer from "react-indiana-drag-scroll";

import { ScheduleCard } from "../schedule_card/ScheduleCard";
import { LeagueSelect } from "../league_select/LeagueSelect";
import { sampleScheduleDataOpen, sampleScheduleDataSenior } from "./sampleData";
import { LeagueType } from "../../types/league_type";

interface SchedulesProps {
  className?: string;
}

/**
 * Schedule section shown on home page.
 */
export const UnstyledSchedules: FunctionComponent<SchedulesProps> = ({
  className,
}) => {
  const [league, setLeague] = useState<LeagueType>(LeagueType.OPEN);

  const scheduleData = useMemo(
    () =>
      league === LeagueType.SENIOR
        ? sampleScheduleDataSenior
        : sampleScheduleDataOpen,
    [league]
  );

  return (
    <>
      <Box className={className}>
        <Box className="schedules-container" py={3}>
          <Container>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              {/* League selection */}
              <Box>
                <Box display="flex">
                  <LeagueSelect
                    title="OPEN"
                    selected={league === LeagueType.OPEN}
                    onClick={() => setLeague(LeagueType.OPEN)}
                  />

                  <LeagueSelect
                    title="SENIOR"
                    selected={league === LeagueType.SENIOR}
                    onClick={() => setLeague(LeagueType.SENIOR)}
                  />
                </Box>
              </Box>

              <Box mt={4}>
                <Box display="flex">
                  <Box className="text-main">Next match schedule</Box>
                </Box>
              </Box>
            </Box>
          </Container>

          {/* Scrollable schedule section */}
          <ScrollContainer className="schedules-card-container">
            {map(scheduleData, (data, idx) => (
              <Box key={`sched-${idx}`} className="scheudle-card">
                <ScheduleCard
                  time={data.time}
                  location={data.location}
                  homeTeam={data.homeTeam}
                  awayTeam={data.awayTeam}
                />
              </Box>
            ))}
          </ScrollContainer>
        </Box>
      </Box>
    </>
  );
};

export const Schedules = withTheme(styled(UnstyledSchedules)`
  position: relative;

  .league-selector {
    cursor: pointer;
  }

  .hl {
    height: 4px;
    position: absolute;
    left: -14%;
    width: 130%;
    top: 110%;
    background: #f17f42;
  }

  .schedules-container {
    background-color: rgba(225, 238, 246, 0.2);
    font-weight: 700;

    .text-main {
      font-size: 1rem;
    }

    .schedules-card-container {
      display: flex;
      justify-content: start;
      padding: 1rem 1rem;
      margin-top: 2rem;

      // Might need below later.
      // scroll-snap-type: x mandatory;
      // -webkit-overflow-scrolling: touch;
      // overflow-x: scroll;
      // white-space: nowrap;

      // Might need below later.
      div {
        // scroll-snap-align: center;
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

      .scheudle-card: nth-child(1) {
        padding-left: 5%;
        @media (min-width: 1500px) {
          padding-left: 8%;
        }
        @media (min-width: 1600px) {
          padding-left: 10%;
        }
        @media (min-width: 1700px) {
          padding-left: 13%;
        }
        @media (min-width: 1900px) {
          padding-left: 17%;
        }
        @media (min-width: 2000px) {
          padding-left: 23%;
        }
      }
      .scheudle-card: last-child {
        padding-right: 15%;
      }
    }
  }
`);
