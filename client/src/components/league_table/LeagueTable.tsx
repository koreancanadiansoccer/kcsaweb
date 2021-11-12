import React, { FunctionComponent, useMemo, useContext } from 'react';
import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';

import { HorizontalDivider } from '../divider/HorizontalDivider';
import { TableType } from '../../types/table_type';
import { ViewerContext } from '../../context/homeViewer';
import { StandingTable } from '../standing_table/StandingTable';
import {
  HomeStandingHeader,
  HomeScorerHeader,
  TableRow,
} from '../standing_table/standingData';

interface LeagueTableProps {
  title: string;
  tableType: TableType;
  tableRowData: TableRow[] | null;
  className?: string;
  flex: number[];
}

// Simple summary table on home page.
const UnstyledLeagueTable: FunctionComponent<LeagueTableProps> = ({
  tableType,
  tableRowData,
  className,
  flex,
}) => {
  const { viewer } = useContext(ViewerContext);

  if (!viewer?.leagueTeamGroupAge) {
    return <Box>...Loading</Box>;
  }

  // Get table header data based on props.
  const tableHeaderData = useMemo(() => {
    if (tableType === TableType.SCORER) return HomeScorerHeader;
    return HomeStandingHeader;
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
        tableType={tableType}
        flex={flex}
      />
    </Box>
  );
};

export const LeagueTable = withTheme(styled(UnstyledLeagueTable)`
  min-width: 275px;

  .row-content {
    font-size: 0.9167rem;
  }

  .league-table-team-logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.7rem;
    font-weight: 500;

    img {
      width: 25px;
      height: 25px;
      margin-right: 0.4rem;
    }
  }
`);
