import React, { FunctionComponent, useState, useMemo, useContext } from 'react';
import Box from '@material-ui/core/Box';
import map from 'lodash/map';

import { DashboardViewerContext } from '../../../context/dashboardViewer';
import { ScheduleCard } from '../../schedules/components/schedule_card/ScheduleCard';

import { UpdateMatchModal } from './modals/UpdateMatchModal';

enum MODAL_TYPE {
  UPDATE_MATCH = 'UPDATE_MATCH',
}

export const DashboardMatches: FunctionComponent = () => {
  const { dashboardViewer } = useContext(DashboardViewerContext);
  const [openModal, setOpenModal] = useState<MODAL_TYPE | null>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>();

  const matches = useMemo(() => {
    return dashboardViewer?.matches || [];
  }, [dashboardViewer]);

  return (
    <>
      {/* Adding players to league team */}
      {openModal === MODAL_TYPE.UPDATE_MATCH && selectedMatchId && (
        <UpdateMatchModal
          fullScreen={true}
          selectedMatchId={selectedMatchId}
          open={openModal === MODAL_TYPE.UPDATE_MATCH}
          onClose={() => setOpenModal(null)}
        />
      )}

      <Box>
        <Box>
          {map(matches, (match) => (
            <Box
              key={match.id}
              onClick={() => {
                setSelectedMatchId(match.id);
                setOpenModal(MODAL_TYPE.UPDATE_MATCH);
              }}
            >
              <ScheduleCard
                date={match.date}
                location={match.location}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                status={match.status}
                mobileWidth={true}
                noHover
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
