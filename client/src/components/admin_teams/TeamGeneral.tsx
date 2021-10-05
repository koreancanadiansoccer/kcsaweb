import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ChangeEvent,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

import { Team } from '../../types/team';
import { ageOptions } from '../../types/age.enum';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { ImgDropzone } from '../dropzone/DropZone';
import { useImgUpload } from '../../hooks/useImgUpload';
import { Select, ColorSelect } from '../select/Select';
import { colorSelectOptions } from '../../utils/color';

interface TeamGeneralProps {
  team: Team;
  updateTeam: (updateTeam: Team) => void;
}

/**
 * Show and allow update to general team info
 */
const UnstyledTeamGneral: FunctionComponent<TeamGeneralProps> = ({
  team: origTeam,
  updateTeam,
}) => {
  const [team, setTeam] = useState<Team>(origTeam);
  const [file, setFile] = useState<File>();
  const [fileLink, setFileLink] = useState('');

  const { generateUploadUrls } = useImgUpload();

  const hasNoChanges = useMemo(() => isEqual(team, origTeam) && !file, [
    team,
    origTeam,
    file,
  ]);

  /**
   * Orig team data can be updated from parent
   * Keep data in sync.
   */
  useEffect(() => {
    setTeam(origTeam);
  }, [origTeam]);

  // Handle logo file update.
  const handleUploadChange = async (files: File[]) => {
    // Dropzone uploader can accept multiple files.
    const tempFile = files[0];

    setFile(tempFile);
    setFileLink(URL.createObjectURL(tempFile));
  };

  const handleUpdate = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      let teamLogoURL = team.teamLogoURL;

      // If new logo was added, prepare for upload.
      if (file?.name && file?.type) {
        // Set file name: {TEAM-NAME}-{TEAM-AGETYPE}
        const fileName = `${team.name}-${team.teamAgeType}`.toLocaleLowerCase();
        teamLogoURL = await generateUploadUrls(file, fileName);
      }

      try {
        await updateTeam({ ...team, teamLogoURL: teamLogoURL });
        setFile(undefined);
        setFileLink('');
      } catch (e) {
        console.info(e);
      }
    },
    [file, updateTeam, generateUploadUrls, team]
  );

  return (
    <Box>
      <Box my={2}>
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

      <Box my={2}>
        <Typography variant="body1">Club Age Group</Typography>

        <Typography variant="body2" color="error">
          *OPEN/SENIOR or custome values.
        </Typography>

        <Select
          defaultValue={find(
            ageOptions,
            (ageOption) => ageOption.value === team.teamAgeType
          )}
          isClearable
          options={ageOptions}
          createable
          handleChange={(option: any) => {
            setTeam({ ...team, teamAgeType: option?.value });
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
        <Button
          disabled={hasNoChanges}
          onClick={handleUpdate}
          color="secondary"
        >
          Update General Info
        </Button>
      </Box>
    </Box>
  );
};

export const TeamGeneral = withTheme(styled(UnstyledTeamGneral)``);
