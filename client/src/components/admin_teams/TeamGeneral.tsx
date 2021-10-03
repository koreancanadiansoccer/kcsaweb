import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useCallback,
} from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { Team } from "../../types/team";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { ImgDropzone } from "../dropzone/DropZone";
import { useImgUpload } from "../../hooks/useImgUpload";

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
  const [fileLink, setFileLink] = useState("");

  const { generateUploadUrls } = useImgUpload();

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

      if (file?.name && file?.type) {
        // Set file name: {TEAM-NAME}-{TEAM-AGETYPE}
        const fileName = `${team.name}-${team.teamAgeType}`.toLocaleLowerCase();
        teamLogoURL = await generateUploadUrls(file, fileName);
      }

      try {
        await updateTeam({ ...team, teamLogoURL: teamLogoURL });
        setFile(undefined);
        setFileLink("");
      } catch (e) {
        console.log(e);
      }
    },
    [file, updateTeam, generateUploadUrls, team]
  );

  return (
    <Box>
      <Box my={2}>
        <Typography variant="body1">Team Age Group</Typography>

        <Typography variant="body2" color="error">
          *OPEN/SENIOR or custome values.
        </Typography>

        <Input
          label="Age Group"
          placeholder="Age Group"
          required
          value={team.teamAgeType}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            setTeam({ ...team, teamAgeType: evt.target.value });
          }}
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Box>

      <Box my={2}>
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

      <Box my={2}>
        <Typography variant="body1">Upload New Logo</Typography>

        <ImgDropzone
          fileLink={fileLink}
          setFile={(files: File[]) => handleUploadChange(files)}
        />
      </Box>

      <Box my={2}>
        <Button onClick={handleUpdate} color="secondary">
          Update General Info
        </Button>
      </Box>
    </Box>
  );
};

export const TeamGeneral = withTheme(styled(UnstyledTeamGneral)``);
