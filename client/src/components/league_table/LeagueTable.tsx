import React, { FunctionComponent, useEffect, useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withTheme } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';

import { GET_USERS } from '../../graphql/users/get_users.query';
import { HorizontalDivider } from '../divider/HorizontalDivider';
import { TableType } from '../../types/table_type';
import { LeagueAgeType } from '../../types/league';

import {
  standingOpen,
  standingHeader,
  scorerHeader,
  scorerOpen,
  standingSenior,
  scorerSenior,
  TableRow,
} from './sampleData';

interface LeagueTableProps {
  title: string;
  tableType: TableType;
  leagueType: LeagueAgeType;
  className?: string;
}

// Simple summary table on home page.
const UnstyledLeagueTable: FunctionComponent<LeagueTableProps> = ({
  tableType,
  leagueType,
  className,
}) => {
  /**BELOW QUERY IS EXMAPLE TO SHOW CONNETION BETWEEN GQL AND FRONTEND - TODO: REMOVE */
  const { loading, data } = useQuery(GET_USERS);

  // Get table header data based on props.
  const tableHeaderData = useMemo(() => {
    if (tableType === TableType.SCORER) return scorerHeader;
    return standingHeader;
  }, [tableType]);

  // Get table row data based on props.
  const tableRowData: TableRow[] = useMemo(() => {
    if (tableType === TableType.SCORER)
      return leagueType === LeagueAgeType.SENIOR ? scorerSenior : scorerOpen;
    return leagueType === LeagueAgeType.SENIOR ? standingSenior : standingOpen;
  }, [tableType, leagueType]);

  // Get table tile data based on props.
  const tableTitle = useMemo(() => {
    if (tableType === TableType.SCORER) return 'TOP SCORER';
    return 'TEAM TABLE';
  }, [tableType]);

  useEffect(() => {
    if (!loading) {
      console.info('NOT LOADING');
    }
  }, [loading, data]);

  return (
    <Box className={className}>
      <Box>
        <HorizontalDivider />
      </Box>

      <Box className={className}>
        <Paper elevation={3}>
          <Box px={2} py={5.625}>
            <Box textAlign="center" mb={2} className="table-title">
              {tableTitle}
            </Box>

            {/* Render table header */}
            <Box
              display="flex"
              justifyContent="space-around"
              className="row-header"
              py={0.75}
              px={1}
            >
              {map(tableHeaderData, (headerText, idx) => {
                const isLongField =
                  headerText === 'Club' || headerText === 'Player';
                return (
                  <Box
                    key={`header-row-${idx}`}
                    flex={isLongField ? 4 : 1}
                    display="flex"
                    justifyContent="center"
                  >
                    {headerText}
                  </Box>
                );
              })}
            </Box>

            {/* Row data */}
            {map(tableRowData, (data, idx) => (
              <Box
                display="flex"
                justifyContent="space-around"
                key={`table-${idx}`}
                py={0.75}
                px={1}
              >
                {mapValues(data, (property, key, idx) => {
                  const isNameField = key === 'name' || key === 'club';
                  return (
                    <Box
                      key={`table-data-${key}-${idx}`}
                      flex={isNameField ? 4 : 1}
                      display="flex"
                      justifyContent="center"
                      borderColor="grey.200"
                      border={2}
                      borderTop={0}
                      borderLeft={0}
                      borderRight={0}
                      py={2}
                    >
                      {property}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export const LeagueTable = withTheme(styled(UnstyledLeagueTable)`
  min-width: 275px;

  .table-title {
    font-size: 1.25rem;
    font-weight: 700;
  }
  .row-header {
    font-size: 0.75rem;
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }
  .row-content {
    font-size: 0.9167rem;
  }
`);
