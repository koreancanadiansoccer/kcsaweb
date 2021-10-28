import React, { FunctionComponent, useMemo, useContext } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';
import map from 'lodash/map';

import { HorizontalDivider } from '../divider/HorizontalDivider';
import { TableType } from '../../types/table_type';
import { ViewerContext } from '../../context/homeViewer';
import { shortenName } from '../../utils/format';

import { standingHeader, scorerHeader, TableRow } from './sampleData';

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
    if (tableType === TableType.SCORER) return scorerHeader;
    return standingHeader;
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
            {!tableRowData || tableRowData.length === 0 ? (
              <Box my={2} textAlign="center">
                No data
              </Box>
            ) : (
              map(tableRowData, (data, dataRowIdx) => (
                <Box key={`table-${dataRowIdx}`}>
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    py={0.75}
                    px={1}
                  >
                    {map(data, (property, key, idx) => {
                      const isNameField = key === 'name' || key === 'club';
                      let value = property;

                      if (key === 'name' && tableType === TableType.SCORER) {
                        value = shortenName(property as string);
                      }

                      return (
                        <Box
                          key={`table-data-${key}-${idx}`}
                          flex={isNameField ? 4 : 1}
                          display="flex"
                          justifyContent="center"
                          py={2}
                        >
                          {value}
                        </Box>
                      );
                    })}
                  </Box>
                  <Divider />
                </Box>
              ))
            )}
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
