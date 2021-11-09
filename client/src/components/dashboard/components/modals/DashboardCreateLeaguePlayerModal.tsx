import React, {
  FunctionComponent,
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import map from 'lodash/map';
import find from 'lodash/find';
import pick from 'lodash/pick';
import every from 'lodash/every';
import filter from 'lodash/filter';
import { useMutation } from '@apollo/client';

import {
  UpdateDashboardInput,
  UpdateDashboardResult,
  UPDATE_DASHBOARD,
  STEPS,
} from '../../../../graphql/update_dashboard.mutation';
import { parseError } from '../../../../graphql/client';
import { Modal } from '../../../modal/Modal';
import { Button } from '../../../button/Button';
import { Select } from '../../../select/Select';
import { ErrorAlert } from '../../../alert_msg/Alerts';
import { LeaguePlayerInput } from '../../../../types/player';
import { DashboardViewerContext } from '../../../../context/dashboardViewer';

export const DashboardCreateLeaguePlayerModal: FunctionComponent<DialogProps> =
  ({ open, onClose }) => {
    const { dashboardViewer, setDashboardViewer } = useContext(
      DashboardViewerContext
    );
    const [error, setError] = useState('');
    const leaguePlayers = useMemo(() => {
      return dashboardViewer.leagueTeam?.leaguePlayers || [];
    }, [dashboardViewer]);

    const [newLeaguePlayers, setNewLeaguePlayers] = useState<
      LeaguePlayerInput[]
    >([]);

    const isValid = useMemo(() => {
      if (!newLeaguePlayers || newLeaguePlayers.length === 0) return false;
      if (!newLeaguePlayers || newLeaguePlayers.length > 0) {
        const valid = every(
          newLeaguePlayers,
          (newLeaguePlayer) =>
            !!newLeaguePlayer.firstName &&
            !!newLeaguePlayer.lastName &&
            !!newLeaguePlayer.dob
        );
        return valid;
      }

      return true;
    }, [newLeaguePlayers]);

    // Craete new players.
    const [updateDashboardMut] = useMutation<
      UpdateDashboardResult,
      UpdateDashboardInput
    >(UPDATE_DASHBOARD);

    const createLeaguePlayers = useCallback(async () => {
      try {
        if (!dashboardViewer.user) {
          setError('Error - please refresh');
          return;
        }

        const res = await updateDashboardMut({
          variables: {
            id: dashboardViewer.user.id,
            step: STEPS.CREATELEAGUEPLAYER,
            leagueTeam: dashboardViewer.leagueTeam,
            newLeaguePlayers: newLeaguePlayers,
          },
        });

        // If success, redirect to team edit page
        if (res.data?.updateDashboard) {
          setDashboardViewer(res.data?.updateDashboard);
          if (onClose) {
            onClose({}, 'backdropClick');
          }
        }
      } catch (e) {
        setError(parseError(e));
      }
    }, [newLeaguePlayers, dashboardViewer, onClose]);

    const playersOption = useMemo(() => {
      const filterChosen = filter(
        dashboardViewer.team?.players,
        (player) =>
          !find(
            leaguePlayers,
            (leaguePlayer) => leaguePlayer.playerId === player.id
          )
      );

      // Filter out already added players.
      return map(filterChosen, (player) => ({
        label: `${player.firstName} ${player.lastName}`,
        value: player.id.toString(),
      }));
    }, [dashboardViewer.team, leaguePlayers]);

    /**
     * Handle option selection change.
     */
    const handleChange = useCallback(
      // eslint-disable-next-line
      async (selectedOption: any) => {
        const origTeamPlayers = dashboardViewer.team?.players;

        const newLeaguePlayers = map(selectedOption, (selected) => {
          // Check if players from original team are selected
          const teamPlayer = find(
            origTeamPlayers,
            (teamPlayer) => teamPlayer.id.toString() === selected.value
          );

          if (teamPlayer) {
            return {
              ...pick(teamPlayer, ['id', 'firstName', 'lastName', 'dob']),
            };
          }

          // If newly entered, just set the name.
          return { firstName: selected.firstName, lastName: selected.lastName };
        });

        setNewLeaguePlayers(newLeaguePlayers);
      },
      [dashboardViewer.team, setNewLeaguePlayers]
    );

    return (
      <Modal open={open} onClose={onClose} title="Add new league players">
        <Select options={playersOption} isMulti handleChange={handleChange} />

        <Box my={2}>
          <Button
            disabled={!isValid}
            color="secondary"
            size="large"
            onClick={() => void createLeaguePlayers()}
          >
            Add Players to League
          </Button>
        </Box>
        <ErrorAlert msg={error} resetMsg={() => setError('')} />
      </Modal>
    );
  };
