import React, {
  FunctionComponent,
  useState,
  useCallback,
  useMemo,
  useContext,
  ChangeEvent,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import { useMutation } from '@apollo/client';

import { Team } from '../../../types/team';
import { ResourceType } from '../../../types/resource.enum';
import { Button } from '../../button/Button';
import { Input } from '../../input/Input';
import { ImgDropzone } from '../../dropzone/DropZone';
import { useImgUpload } from '../../../hooks/useImgUpload';
import { ColorSelect } from '../../select/Select';
import { colorSelectOptions } from '../../../utils/color';
import {
  UpdateDashboardInput,
  UpdateDashboardResult,
  UPDATE_DASHBOARD,
  STEPS,
} from '../../../graphql/update_dashboard.mutation';
import { parseError } from '../../../graphql/client';
import { DashboardViewerContext } from '../../../context/dashboardViewer';
import { ErrorAlert } from '../../alert_msg/Alerts';

/**
 * Show and allow update to general team info
 */
const UnstyledClubGneral: FunctionComponent = () => {
  const { dashboardViewer, setDashboardViewer } = useContext(
    DashboardViewerContext
  );

  if (!dashboardViewer.team) {
    return <Box>Could not find team</Box>;
  }

  const [team, setTeam] = useState<Team>(dashboardViewer.team);
  const [file, setFile] = useState<File>();
  const [fileLink, setFileLink] = useState('');

  const { generateUploadUrls } = useImgUpload();

  const hasNoChanges = useMemo(
    () => isEqual(team, dashboardViewer.team) && !file,
    [team, dashboardViewer, file]
  );

  const [error, setError] = useState('');

  const [updateDashboardMut] = useMutation<
    UpdateDashboardResult,
    UpdateDashboardInput
  >(UPDATE_DASHBOARD);

  const updateTeam = useCallback(async () => {
    try {
      let teamLogoURL = team.teamLogoURL;

      // If new logo was added, prepare for upload.
      if (file?.name && file?.type) {
        // Set file name: {TEAM-NAME}-{TEAM-AGETYPE}
        const fileName = `${team.name}-${team.teamAgeType}`.toLocaleLowerCase();
        teamLogoURL = await generateUploadUrls(
          file,
          fileName,
          ResourceType.LOGO
        );
      }
      if (!dashboardViewer.user) {
        setError('Error - please refresh');
        return;
      }
      const res = await updateDashboardMut({
        variables: {
          step: STEPS.UPDATETEAM,
          id: dashboardViewer.user.id,
          team: { ...team, teamLogoURL },
        },
      });

      if (res.data) {
        setDashboardViewer(res.data?.updateDashboard);
        setFile(undefined);
        setFileLink('');
      }
    } catch (e) {
      console.info(parseError(e));
    }
  }, [updateDashboardMut, team, file, dashboardViewer]);

  // Handle logo file update.
  const handleUploadChange = async (files: File[]) => {
    // Dropzone uploader can accept multiple files.
    const tempFile = files[0];

    setFile(tempFile);
    setFileLink(URL.createObjectURL(tempFile));
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="body1">Club Name</Typography>

        <Input
          label="Club Name"
          placeholder="Club Name"
          required
          value={team.name}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setTeam({ ...team, name: evt.target.value });
          }}
        />
      </Box>

      <Divider />

      {/* Founded Date */}
      <Box my={2}>
        <Typography variant="body1"> Club Founded Date</Typography>
        <Input
          id="datetime-local"
          label="Match Time"
          value={team?.foundedDate}
          type="month"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTeam({ ...team, foundedDate: e.target.value });
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Divider />

      <Box my={3}>
        <Typography variant="body1">Club Color</Typography>

        <ColorSelect
          options={colorSelectOptions}
          defaultValue={find(
            colorSelectOptions,
            (colorOption) => colorOption.value === team.teamColor
          )}
          createable
          // eslint-disable-next-line
          handleChange={(option: any) => {
            setTeam({ ...team, teamColor: option?.value });
          }}
        />
      </Box>

      <Divider />

      <Box my={3}>
        <Typography variant="body1">Uploaded Logo</Typography>

        {team.teamLogoURL ? (
          <Box width={100} height={100}>
            {/* Hack to reload img with same url: Append random unique query param */}
            <img src={`${team.teamLogoURL}?${Date.now()}`} alt="team-logo" />
          </Box>
        ) : (
          <Box fontStyle="italic">No logo added</Box>
        )}
      </Box>

      <Box my={3}>
        <Typography variant="body1">Upload New Logo</Typography>

        <ImgDropzone
          fileLink={fileLink}
          setFile={(files: File[]) => handleUploadChange(files)}
        />
      </Box>

      <Divider />

      <Box my={2}>
        <Button disabled={hasNoChanges} onClick={updateTeam} color="secondary">
          Update General Info
        </Button>
      </Box>
      <ErrorAlert msg={error} resetMsg={() => setError('')} />
    </Box>
  );
};

export const ClubGeneral = withTheme(styled(UnstyledClubGneral)``);
