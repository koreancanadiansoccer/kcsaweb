import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  ChangeEvent,
} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import { useMutation } from '@apollo/client';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Team } from '../../../types/team';
import { ageOptions } from '../../../types/age.enum';
import { Button } from '../../../components/button/Button';
import { Input } from '../../../components/input/Input';
import { ImgDropzone } from '../../../components/dropzone/DropZone';
import { useCloudinaryUpload } from '../../../hooks/useCloudinaryUpload';
import { Select, ColorSelect } from '../../../components/select/Select';
import { Image } from '../../../components/image/Image';
import { colorSelectOptions } from '../../../utils/color';
import { TeamContext } from '../../../context/team';
import {
  UPDATE_TEAM,
  UpdateTeamInput,
  UpdateTeamResult,
} from '../../../graphql/teams/update_team.mutation';
import { parseError } from '../../../graphql/client';

/**
 * Show and allow update to general team info
 */
export const AdminTeamGeneral: FunctionComponent = () => {
  const { team: origTeam, setTeam: setOrigTeam } = useContext(TeamContext);

  const [team, setTeam] = useState<Team>(origTeam);
  const [file, setFile] = useState<File>();
  const [fileLink, setFileLink] = useState('');

  const { generateSignature } = useCloudinaryUpload();

  const hasNoChanges = useMemo(
    () => isEqual(team, origTeam) && !file,
    [team, origTeam, file]
  );

  const [updateTeamMutation] = useMutation<UpdateTeamResult, UpdateTeamInput>(
    UPDATE_TEAM
  );

  /**
   * Orig team data can be updated from parent
   * Keep data in sync.
   */
  useEffect(() => {
    setTeam(origTeam);
  }, [origTeam]);

  const updateTeam = useCallback(async () => {
    try {
      let teamLogoURL = team.teamLogoURL;

      // replaced with cloudinary.
      if (file?.name && file?.type) {
        const fileName = `${team.name}-${team.teamAgeType}`.toLocaleLowerCase();
        const cloudinaryResultId = await generateSignature(file, fileName);
        teamLogoURL = cloudinaryResultId;
      }

      const res = await updateTeamMutation({
        variables: {
          updateTeam: { ...team, teamLogoURL: teamLogoURL },
        },
      });

      if (res.data) {
        setOrigTeam(res.data.updateTeam);
        setFile(undefined);
        setFileLink('');
      }
    } catch (e) {
      console.info(parseError(e));
    }
  }, [updateTeamMutation, team, file]);

  // Handle logo file update.
  const handleUploadChange = async (files: File[]) => {
    // Dropzone uploader can accept multiple files.
    const tempFile = files[0];

    if (tempFile) {
      setFile(tempFile);
      setFileLink(URL.createObjectURL(tempFile));
    }
  };

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

      {/* Founded Date */}
      <Box my={2}>
        <Typography variant="body1"> Club Founded Year</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            format="yyyy"
            placeholder="yyyy"
            views={['year']}
            error={!team?.foundedDate}
            value={team.foundedDate}
            disableFuture
            onChange={(date) => {
              setTeam({ ...team, foundedDate: date });
            }}
          />
        </MuiPickersUtilsProvider>
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
          // eslint-disable-next-line
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
          <Box>
            <Image
              teamLogoURL={team.teamLogoURL}
              className="admin-team-general-logo"
            />
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
          resetFiles={() => {
            setFile(undefined);
            setFileLink('');
          }}
        />
      </Box>

      <Divider />

      <Box my={2}>
        <Button disabled={hasNoChanges} onClick={updateTeam} color="secondary">
          Update General Info
        </Button>
      </Box>
    </Box>
  );
};
