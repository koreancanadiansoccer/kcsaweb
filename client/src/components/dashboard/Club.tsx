import React, { FunctionComponent } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';

import { Tabs, PanelOptions } from '../tabs/Tabs';

import { ClubGeneral } from './components/ClubGeneral';
import { ClubPlayers } from './components/ClubPlayers';

const panelOptions: PanelOptions[] = [
  {
    label: 'General',
    comp: <ClubGeneral />,
  },
  {
    label: 'Players',
    comp: <ClubPlayers />,
  },
];

/**
 * Show and allow update to general team info
 */
const UnstyledClub: FunctionComponent = () => {
  const [tabSelected, setTabSelected] = React.useState(0);

  return (
    <Box>
      <Box mb={2}>
        <Tabs
          value={tabSelected}
          setValue={(value: number) => setTabSelected(value)}
          panelOptions={panelOptions}
        />
      </Box>
    </Box>
  );
};

export const Club = withTheme(styled(UnstyledClub)``);
