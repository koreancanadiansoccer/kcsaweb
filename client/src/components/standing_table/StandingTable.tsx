import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import map from 'lodash/map';

import { shortenName } from '../../utils/format';
import { TableType } from '../../types/table_type';

import { TableRow } from './standingData';

interface StandingTable {
  className?: string;
  title?: string;
  tableRowData: TableRow[] | null;
  tableHeaderData: string[];
  paperShadow?: number;
  hideHeader?: string;
  tableType?: TableType;
  standingTableClassName?: string;
  headerClassName?: string;
  rowContentClassName?: string;
  dividerClassName?: string;
  rowClick?: (id: number) => Promise<void>;
  pagination?: JSX.Element;
  selectedRow?: number;
  flex: number[];
}

/**
 * Generate standings table.
 */
const UnstyledStandingTable: FunctionComponent<StandingTable> = ({
  className,
  title,
  tableRowData,
  tableHeaderData,
  paperShadow = 3,
  hideHeader,
  tableType,
  standingTableClassName = 'default-standing-table-box',
  headerClassName = 'default-table-header',
  rowContentClassName = 'default-row-content',
  dividerClassName = 'default-standing-table-divider',
  rowClick,
  pagination,
  selectedRow,
  flex,
}) => {

  return (
    <Box className={className}>
      <Paper elevation={paperShadow}>
        <Box px={2} py={5.625} className={standingTableClassName}>
          {title && (
            <Box textAlign="center" mb={2} className="default-table-title">
              {title}
            </Box>
          )}

          {/* Render table header */}
          <Box
            display="flex"
            justifyContent="space-around"
            className={headerClassName}
            py={0.75}
            px={1}
          >
            {map(tableHeaderData, (headerText, idx) => {
              return (
                <Box
                  key={`header-row-${idx}`}
                  flex={flex[idx]}
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
            map(tableRowData, (data, dataRowIdx) => {
              let colIdx = 0;
              return (
              <Box
                key={`table-${dataRowIdx}`}
                className={
                  selectedRow === dataRowIdx
                    ? 'default-selected-row'
                    : rowContentClassName
                }
                onClick={
                  rowClick
                    ? () => {
                        void rowClick(dataRowIdx);
                      }
                    : undefined
                }
              >
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  py={0.75}
                  px={1}
                >
                  {map(data, (property, key, idx) => {
                    let value: string | number | JSX.Element = property;

                    if (key === 'name' && tableType === TableType.SCORER) {
                      value = shortenName(property as string);
                    }

                    return (
                      <Box
                        key={`table-data-${key}-${idx}`}
                        flex={flex[colIdx++]}
                        display="flex"
                        justifyContent={
                          key === 'club' ? 'flex-start' : 'center'
                        }
                        py={2}
                        minWidth={key === 'name' ? '6rem' : ''}
                      >
                        {value}
                      </Box>
                    );
                  })}
                </Box>
                <Divider className={dividerClassName} />
              </Box>
            )})
          )}
        </Box>

        {pagination && pagination}
      </Paper>
    </Box>
  );
};

export const StandingTable = withTheme(styled(UnstyledStandingTable)`
  .default-table-title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .default-table-header {
    font-size: 0.75rem;
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }

  .default-selected-row {
    opacity: 0.5;
  }
`);
