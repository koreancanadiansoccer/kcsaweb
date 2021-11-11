import React, {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
  ChangeEvent,
} from 'react';
import map from 'lodash/map';
import { DialogProps } from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import { ImgDropzone } from '../../../dropzone/DropZone';
import { useImgUpload } from '../../../../hooks/useImgUpload';
import {
  UpdateDashboardInput,
  UpdateDashboardResult,
  UPDATE_DASHBOARD,
  STEPS,
} from '../../../../graphql/update_dashboard.mutation';
import { Modal } from '../../../modal/Modal';
import { Button } from '../../../button/Button';
import { Input } from '../../../input/Input';
import { DashboardViewerContext } from '../../../../context/dashboardViewer';
import { parseError } from '../../../../graphql/client';
import { ErrorAlert } from '../../../alert_msg/Alerts';
import { ResourceType } from '../../../../types/resource.enum';
import { MatchStatus } from '../../../../types/match';

interface UpdateMatchModalProps
  extends Pick<DialogProps, 'open' | 'onClose' | 'fullScreen'> {
  selectedMatchId: number;
}

export const UpdateMatchModal: FunctionComponent<UpdateMatchModalProps> = ({
  selectedMatchId,
  open,
  onClose,
  fullScreen,
}) => {
  const { dashboardViewer, setDashboardViewer } = useContext(
    DashboardViewerContext
  );
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  //   Game sheet upload.
  const [file, setFile] = useState<File>();
  const [fileLink, setFileLink] = useState('');

  const match = useMemo(() => {
    return find(
      dashboardViewer.matches,
      (match) => match.id === selectedMatchId
    );
  }, [dashboardViewer]);

  if (!match) {
    return <Box>No Match Found</Box>;
  }

  const isHomeTeam = useMemo(() => {
    const leagueTeam = dashboardViewer.leagueTeam;

    if (match.homeTeam.id === leagueTeam?.id) return true;
    return false;
  }, [dashboardViewer, match]);

  const [submissionData, setSubmissionData] = useState(
    isHomeTeam
      ? omit(match.matchHomeSubmission, ['matchHomeSubmissionPlayers'])
      : omit(match.matchAwaySubmission, ['matchAwaySubmissionPlayers'])
  );

  const gameSheetImg = isHomeTeam
    ? match.matchHomeSubmission.homeTeamGameSheetLink
    : match.matchAwaySubmission.awayTeamGameSheetLink;

  const [matchSubmissionPlayers, setMatchSubmissionPlayers] = useState(
    isHomeTeam
      ? match.matchHomeSubmission.matchHomeSubmissionPlayers
      : match.matchAwaySubmission.matchAwaySubmissionPlayers
  );

  useEffect(() => {
    setSubmissionData(
      isHomeTeam
        ? omit(match.matchHomeSubmission, ['matchHomeSubmissionPlayers'])
        : omit(match.matchAwaySubmission, ['matchAwaySubmissionPlayers'])
    );

    setMatchSubmissionPlayers(
      isHomeTeam
        ? match.matchHomeSubmission.matchHomeSubmissionPlayers
        : match.matchAwaySubmission.matchAwaySubmissionPlayers
    );
  }, [match, isHomeTeam]);

  const teamScore = useMemo(() => {
    let score = 0;

    forEach(matchSubmissionPlayers, (submissionPlayer) => {
      score += submissionPlayer.goalScored;
    });

    return score;
  }, [matchSubmissionPlayers]);

  const titleText = useMemo(() => {
    if (isHomeTeam)
      return `Submit Form for ${match.homeTeam.team.name.toUpperCase()} (HOME)`;
    return `Submit Form for ${match.awayTeam.team.name.toUpperCase()} (AWAY)`;
  }, [isHomeTeam, match]);

  const hasNoChanges = useMemo(() => {
    if (isHomeTeam) {
      return (
        isEqual(
          omit(match.matchHomeSubmission, ['matchHomeSubmissionPlayers']),
          submissionData
        ) &&
        isEqual(
          match.matchHomeSubmission.matchHomeSubmissionPlayers,
          matchSubmissionPlayers
        ) &&
        !file
      );
    }
    return (
      isEqual(
        omit(match.matchAwaySubmission, ['matchAwaySubmissionPlayers']),
        submissionData
      ) &&
      isEqual(
        match.matchAwaySubmission.matchAwaySubmissionPlayers,
        matchSubmissionPlayers
      ) &&
      !file
    );
  }, [submissionData, matchSubmissionPlayers, match, file]);

  // Craete new players.
  const [updateDashboardMut] = useMutation<
    UpdateDashboardResult,
    UpdateDashboardInput
  >(UPDATE_DASHBOARD);

  const { generateUploadUrls } = useImgUpload();

  // Handle logo file update.
  const handleImgUploadChange = async (files: File[]) => {
    // Dropzone uploader can accept multiple files.
    const tempFile = files[0];

    setFile(tempFile);
    setFileLink(URL.createObjectURL(tempFile));
  };

  const submitMatchData = useCallback(async () => {
    try {
      if (!dashboardViewer.user) {
        setError('Error - please refresh');
        return;
      }
      let gameSheetLink: string | undefined = gameSheetImg;
      if (file?.name && file?.type) {
        // Set file name: {TEAM-NAME}-{TEAM-AGETYPE}
        const fileName = `${match.id}-${match.date}-${
          isHomeTeam ? match.homeTeam.team.name : match.awayTeam.team.name
        }-vs-${
          isHomeTeam ? match.awayTeam.team.name : match.awayTeam.team.name
        }-${isHomeTeam ? 'HOME' : 'AWAY'}`.toLocaleLowerCase();

        gameSheetLink = await generateUploadUrls(
          file,
          fileName,
          ResourceType.GAMESHEET
        );
      }

      const submitData = {
        ...submissionData,
        score: teamScore,
        gameSheetLink: gameSheetLink,
        matchSubmissionPlayers: matchSubmissionPlayers,
      };

      const res = await updateDashboardMut({
        variables: {
          id: dashboardViewer.user.id,
          step: STEPS.SUBMITMATCHDATA,
          match: match,
          isHomeTeam: isHomeTeam,
          matchSubmissionData: submitData,
        },
      });

      // If success, redirect to team edit page
      if (res.data?.updateDashboard) {
        setDashboardViewer(res.data?.updateDashboard);
        setFile(undefined);
        setFileLink('');
      }
    } catch (e) {
      setError(parseError(e));
    }
  }, [
    isHomeTeam,
    match,
    dashboardViewer,
    submissionData,
    teamScore,
    onClose,
    file,
  ]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      title={`Match Round ${match.matchDay} - ${match.homeTeam.team.name} vs ${
        match.awayTeam.team.name
      } - ${dayjs(match.date, 'YYYY-MM-DDTHH:mm').format(
        'YYYY-MMM-DD hh:mmA'
      )}`}
    >
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
        <Chip
          label={`${match.status} - Awaiting submissions from both teams`}
          disabled
        />
      )}

      {match.status === MatchStatus.MISMATCH && (
        <Chip
          label={`${match.status} On team submissions - Admin verifying`}
          color="secondary"
          style={{
            color: 'white',
          }}
        />
      )}

      <Box
        width={isMobile ? '100%' : '50%'}
        my={2}
        justifyContent="space-between"
      >
        <Box mb={1}>
          <Typography variant="body1" className="boldText">
            {titleText}
          </Typography>
        </Box>

        <Box mb={1}>
          <Typography variant="body1" className="boldText">
            Players records:
          </Typography>
        </Box>

        <Box>
          {map(matchSubmissionPlayers, (matchPlayer, idx) => (
            <Box
              border={1}
              display={isMobile ? '' : 'flex'}
              justifyContent="space-between"
              alignItems="center"
              px={isMobile ? 1 : 1.5}
              key={`${matchPlayer.player.firstName}-${matchPlayer.player.lastName}${idx}`}
            >
              <Box>
                <Typography variant="body1">
                  {`${matchPlayer.player.firstName} ${matchPlayer.player.lastName}`.toUpperCase()}
                </Typography>
              </Box>

              <Box display="flex">
                <Box mx={isMobile ? 0.5 : 1}>
                  <Input
                    label="Goal"
                    placeholder="Goals"
                    value={matchPlayer.goalScored}
                    type="number"
                    margin="dense"
                    size="small"
                    style={{ width: 100 }}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                      const matchPlayerTemp = [...matchSubmissionPlayers];
                      matchPlayerTemp[idx] = {
                        ...matchPlayerTemp[idx],
                        goalScored: parseInt(evt.target.value, 10),
                      };
                      setMatchSubmissionPlayers(matchPlayerTemp);
                    }}
                    inputProps={{ min: 0 }}
                  />
                </Box>

                <Box mx={isMobile ? 0.5 : 1}>
                  <Input
                    label="YellowCard"
                    placeholder="Yellowcard"
                    value={matchPlayer.yellowCard}
                    type="number"
                    margin="dense"
                    size="small"
                    style={{ width: 100 }}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                      const matchPlayerTemp = [...matchSubmissionPlayers];
                      matchPlayerTemp[idx] = {
                        ...matchPlayerTemp[idx],
                        yellowCard: parseInt(evt.target.value, 10),
                      };
                      setMatchSubmissionPlayers(matchPlayerTemp);
                    }}
                    inputProps={{ min: 0, max: 2 }}
                  />
                </Box>

                <Box mx={isMobile ? 0.5 : 1}>
                  <Input
                    label="RedCard"
                    placeholder="RedCard"
                    value={matchPlayer.redCard}
                    type="number"
                    margin="dense"
                    size="small"
                    style={{ width: 100 }}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                      const matchPlayerTemp = [...matchSubmissionPlayers];
                      matchPlayerTemp[idx] = {
                        ...matchPlayerTemp[idx],
                        redCard: parseInt(evt.target.value, 10),
                      };
                      setMatchSubmissionPlayers(matchPlayerTemp);
                    }}
                    inputProps={{ min: 0, max: 1 }}
                  />
                </Box>
              </Box>
            </Box>
          ))}

          <Box my={2}>
            <Typography variant="h6" className="boldText">
              {`Score(Auto Calculated): ${teamScore}`}
            </Typography>
          </Box>

          <Divider />

          <Box mt={2}>
            <Typography variant="body1" className="boldText">
              Opponent Score:
            </Typography>
          </Box>

          <Box mx={isMobile ? 0.5 : 1}>
            <Input
              label="Score"
              placeholder="Opponent Goals"
              value={
                isHomeTeam
                  ? submissionData.awayTeamScore
                  : submissionData.homeTeamScore
              }
              type="number"
              style={{ width: 100 }}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                if (isHomeTeam) {
                  setSubmissionData({
                    ...submissionData,
                    awayTeamScore: parseInt(evt.target.value, 10),
                  });
                  return;
                }
                setSubmissionData({
                  ...submissionData,
                  homeTeamScore: parseInt(evt.target.value, 10),
                });
              }}
              inputProps={{ min: 0 }}
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box my={3}>
        <Typography variant="body1">Upload Game sheet</Typography>

        <Box my={3}>
          {gameSheetImg ? (
            <Box>
              {/* Hack to reload img with same url: Append random unique query param */}
              <img
                style={{ width: '400px', height: '700px' }}
                src={`${gameSheetImg}?${Date.now()}`}
                alt="team-logo"
              />
            </Box>
          ) : (
            <Box fontStyle="italic">No Game sheet added</Box>
          )}
        </Box>

        <ImgDropzone
          fileLink={fileLink}
          fileType="gamesheet"
          maxSize={5242880}
          setFile={(files: File[]) => handleImgUploadChange(files)}
        />
      </Box>

      <Divider />
      <Box mt={3}>
        <Button
          disabled={hasNoChanges || match.status === MatchStatus.COMPLETE}
          size="large"
          onClick={() => void submitMatchData()}
        >
          Submit/Update
        </Button>
      </Box>

      {match.status === MatchStatus.COMPLETE && (
        <Typography variant="body2" color="error">
          Match is in Complete state. Please contact Admin to update
        </Typography>
      )}

      <ErrorAlert msg={error} resetMsg={() => setError('')} />
    </Modal>
  );
};
