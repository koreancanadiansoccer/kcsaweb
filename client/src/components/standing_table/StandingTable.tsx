import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import map from 'lodash/map';
import find from 'lodash/find';

import { shortenName } from '../../utils/format';
import { TableType } from '../../types/table_type';

import { TableRow } from './standingData';

interface StandingTable {
  className?: string;
  title?: string;
  tableRowData: TableRow[] | null;
  tableHeaderData: string[];
  headerLongField: string[];
  rowLongField: string[];
  cusElevation?: number;
  hideHeader?: string;
  flexWidth?: number;
  tableType?: TableType;
}

/**
 * Generate standings table.
 */
const UnstyledStandingTable: FunctionComponent<StandingTable> = ({
  className,
  title,
  tableRowData,
  tableHeaderData,
  headerLongField,
  rowLongField,
  cusElevation,
  hideHeader,
  flexWidth,
  tableType,
}) => {
  return (
    <Box className={className}>
      <Paper elevation={!cusElevation ? cusElevation : 3}>
        <Box px={2} py={5.625} className="standing-table-box">
          {title && (
            <Box textAlign="center" mb={2} className="table-title">
              {title}
            </Box>
          )}

          {/* Render table header */}
          <Box
            display="flex"
            justifyContent="space-around"
            className="table-header"
            py={0.75}
            px={1}
          >
            {map(tableHeaderData, (headerText, idx) => {
              const isLongField = find(
                headerLongField,
                (field) => headerText == field
              );
              return (
                <Box
                  key={`header-row-${idx}`}
                  flex={isLongField ? 4 : flexWidth ? flexWidth : 1}
                  display="flex"
                  justifyContent="center"
                >
                  {headerText === hideHeader ? null : headerText}
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
              <Box key={`table-${dataRowIdx}`} className="row-content">
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  py={0.75}
                  px={1}
                >
                  {map(data, (property, key, idx) => {
                    const isNameField = find(rowLongField, (field) => {
                      if (key == field) return true;
                    });
                    let value: string | number | JSX.Element = property;

                    if (key === 'name' && tableType === TableType.SCORER) {
                      value = shortenName(property as string);
                    }
                      return (
                        <Box
                          key={`table-data-${key}-${idx}`}
                          flex={isNameField ? 4 : flexWidth ? flexWidth : 1}
                          display="flex"
                          justifyContent="center"
                          py={2}
                        >
                          {value}
                        </Box>
                      );
                  })}
                </Box>
                <Divider className="standing-table-divider" />
              </Box>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export const StandingTable = withTheme(styled(UnstyledStandingTable)`
  .table-title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .table-header {
    font-size: 0.75rem;
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }
`);
