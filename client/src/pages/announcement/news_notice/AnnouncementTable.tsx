import React, { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { scroller } from 'react-scroll';

import { StandingTable } from '../../../components/standing_table/StandingTable';
import { TableRow, AnnouncementPageStandingHeader } from '../../../components/standing_table/standingData';
import { Pagination } from '../../../components/pagination/Pagination';

interface AnnouncementTableProps {
  className?: string;
  tableRowData: TableRow[];
  selectedID: string;
  onChange: (id: string) => Promise<void>;
  isMobile?: boolean;
}

/**
 * Announcement Page Table.
 */

const UnstyledAnnouncementTable: FunctionComponent<AnnouncementTableProps> = ({
  className,
  tableRowData,
  selectedID,
  onChange,
  isMobile,
}) => {
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(isMobile? 5 : 10);

  useMemo(() => {
    if (parseInt(selectedID) < rowsPerPage) setPage(0);
    else { setPage(Math.floor(parseInt(selectedID) / rowsPerPage)) }
  }, [selectedID])

  const handlePageChange = async (page: number) => {
    setPage(page);
  };

  return (
    <Box className={className}>
      <Box>
        <Box
          fontSize="h5.fontSize"
          ml={4}
          mt={5}
          mb={isMobile ? 3 : 5}
          fontWeight="bold"
          className="news-standing-banner-text"
        >
          Announcement
        </Box>

        <StandingTable
          tableRowData={tableRowData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          headerClassName="announcement-table-header"
          tableHeaderData={AnnouncementPageStandingHeader}
          flex={isMobile ? [1, 4, 1.5] : [1, 4, 1]}
          rowContentClassName="announcement-table-row"
          selectedRow={parseInt(selectedID) - rowsPerPage * page}
          rowClick={(id: number) => {
            const idx = id + page * rowsPerPage;

            void onChange(String(idx));
            history.push(`/announcement/${idx}`);
            scroller.scrollTo('selectedAnnouncement', {
              smooth: false,
              offset: isMobile ? 110 : 300,
              duration: 500,
            });
          }}
          pagination={
            <Pagination
              className="announcement-pagination"
              activePage={page}
              rowsPerPage={rowsPerPage}
              onChange={(page: number) => {
                handlePageChange(page);
              }}
              imageLength={tableRowData.length}
              isMobile={isMobile}
            />
          }
        />
      </Box>
    </Box>
  );
};

export const AnnouncementTable = withTheme(styled(UnstyledAnnouncementTable)`
  .announcement-table-header {
    font-size: 1.06rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }

  .announcement-table-row {
    cursor: pointer;
  }

  .announcement-pagination {
    div svg {
      font-size: medium;
    }
  }
`);
