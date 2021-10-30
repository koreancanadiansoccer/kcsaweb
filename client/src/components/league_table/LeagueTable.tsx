import React, { FunctionComponent, useMemo, useContext } from 'react';
import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';

import { HorizontalDivider } from '../divider/HorizontalDivider';
import { TableType } from '../../types/table_type';
import { ViewerContext } from '../../context/homeViewer';
import { StandingTable } from '../standing_table/StandingTable'
import {
  homeStandingHeader,
  homeScorerHeader,
  TableRow,
} from '../standing_table/standingData';

interface LeagueTableProps {
  title: string;
  tableType: TableType;
  tableRowData: TableRow[] | null;
  className?: string;
}

// Simple summary table on home page.
const UnstyledLeagueTable: FunctionComponent<LeagueTableProps> = ({
  tableType,
  tableRowData,
  className,
}) => {
  const { viewer } = useContext(ViewerContext);

  if (!viewer?.leagueTeamGroupAge) {
    return <Box>...Loading</Box>;
  }

  // Get table header data based on props.
  const tableHeaderData = useMemo(() => {
    if (tableType === TableType.SCORER) return homeScorerHeader;
    return homeStandingHeader;
  }, [tableType]);

  // Get table tile data based on props.
  const tableTitle = useMemo(() => {
    if (tableType === TableType.SCORER) return 'TOP SCORER';
    return 'TEAM TABLE';
  }, [tableType]);

  return (
    <Box className={className}>
      <Box>
        <HorizontalDivider />
      </Box>

      <StandingTable
        title={tableTitle}
        tableRowData={tableRowData}
        tableHeaderData={tableHeaderData}
        headerLongField={['Club', 'Player']}
        rowLongField={['name', 'club']}
      />
    </Box>
  );
};

export const LeagueTable = withTheme(styled(UnstyledLeagueTable)`
  min-width: 275px;

  .row-content {
    font-size: 0.9167rem;
  }

  .team-logo {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;

    img {
      width: 25px;
      height: 25px;
    }
  }
`);
