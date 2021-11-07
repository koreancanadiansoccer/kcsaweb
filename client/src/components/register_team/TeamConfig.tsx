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
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { Team } from '../../types/team';
import { ageOptions } from '../../types/age.enum';
import { Button } from '../button/Button';
import { ResourceType } from '../../types/resource.enum';
import { Input } from '../input/Input';
import { ImgDropzone } from '../dropzone/DropZone';
import { useImgUpload } from '../../hooks/useImgUpload';
import { Select, ColorSelect } from '../select/Select';
import { colorSelectOptions } from '../../utils/color';
import {
  RegisterTeamInput,
  RegisterTeamResult,
  REGISTER_TEAM,
} from '../../graphql/users/register_team.mutation';
import { parseError } from '../../graphql/client';
import { ViewerContext } from '../../context/homeViewer';
import { ErrorAlert } from '../alert_msg/Alerts';

interface TeamConfigProps {
  handleNext: () => void;
}
/**
 * Register team for first time.
 */
const UnstyledTeamConfig: FunctionComponent<TeamConfigProps> = ({
  handleNext,
}) => {
  const { viewer, setViewer } = useContext(ViewerContext);
  const history = useHistory();

  if (!viewer.user?.team) {
    history.replace({ pathname: '/' });
    return <Box>No Team Found</Box>;
  }

  const [team, setTeam] = useState<Team>(viewer.user?.team);
  const [file, setFile] = useState<File>();
  const [fileLink, setFileLink] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const { generateUploadUrls } = useImgUpload();

  const isValid = useMemo(
    () =>
      !!team.name &&
      !!team.foundedDate &&
      !!team.teamAgeType &&
      !!team.teamColor,
    [team]
  );

  const [registerTeamMut] = useMutation<RegisterTeamResult, RegisterTeamInput>(
    REGISTER_TEAM
  );

  const registerTeam = useCallback(async () => {
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

      const res = await registerTeamMut({
        variables: {
          team: { ...team, teamLogoURL: teamLogoURL },
          step: 'TEAM',
        },
      });

      if (res.data?.registerTeam) {
        setViewer({ ...viewer, user: res.data.registerTeam });
        setFile(undefined);
        setFileLink('');
        handleNext();
      }
    } catch (e) {
      setErrorMsg(parseError(e));
    }
  }, [registerTeamMut, team, file]);

  // Handle logo file update.
  const handleUploadChange = async (files: File[]) => {
    // Dropzone uploader can accept multiple files.
    const tempFile = files[0];

    setFile(tempFile);
    setFileLink(URL.createObjectURL(tempFile));
  };

  return (
    <Box>
      <Typography variant="body1" color="error">
        *You can edit this later.
      </Typography>
      <Box my={2}>
        <Typography variant="body1">
          Club Name
          <span style={{ color: 'red', fontSize: '1rem' }}>&nbsp;*</span>
        </Typography>

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
        <Typography variant="body1">
          Club Founded Year
          <span
            style={{
              color: 'red',
              fontSize: '1rem',
            }}
          >
            &nbsp;*
          </span>
        </Typography>

        <Input
          id="datetime-local"
          label="Founded Year"
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

      <Box my={2}>
        <Typography variant="body1">
          Club Age Group
          <span
            style={{
              color: 'red',
              fontSize: '1rem',
            }}
          >
            &nbsp;*
          </span>
        </Typography>

        <Typography variant="body2" color="error">
          *OPEN/SENIOR/OVER40 or custom values.
        </Typography>

        <Select
          defaultValue={find(
            ageOptions,
            (ageOption) => ageOption.value === team.teamAgeType
          )}
          isClearable
          options={ageOptions}
          createable
          // eslint-disable-next-line
          handleChange={(option: any) => {
            setTeam({ ...team, teamAgeType: option?.value });
          }}
        />
      </Box>

      <Divider />

      <Box my={3}>
        <Typography variant="body1">
          Club Color
          <span
            style={{
              color: 'red',
              fontSize: '1rem',
            }}
          >
            &nbsp;*
          </span>
        </Typography>

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
        <Button disabled={!isValid} onClick={registerTeam} color="secondary">
          Update & Continue
        </Button>
      </Box>
      <ErrorAlert msg={errorMsg} resetMsg={() => setErrorMsg('')} />
    </Box>
  );
};

export const TeamConfig = withTheme(styled(UnstyledTeamConfig)``);
