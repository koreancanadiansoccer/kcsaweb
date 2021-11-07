import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { scroller } from 'react-scroll';

import { StandingTable } from '../../../components/standing_table/StandingTable';
import { TableRow, AnnouncementPageStandingHeader } from '../../../components/standing_table/standingData';
import { Pagination } from '../../../components/pagination/Pagination';

interface AnnouncementTableProps {
  className?: string;
  tableRowData: TableRow[];
  selectedID: string;
  onChange: (id: string) => Promise<void>;
}

/**
 * Announcement Page Table.
 */
const UnstyledAnnouncementTable: FunctionComponent<AnnouncementTableProps> = ({
  className,
  tableRowData,
  selectedID,
  onChange,
}) => {
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const handlePageChange = async (page: number) => {
    setPage(page);
  };

  return (
    <Box className={className}>
      <Box>
        <Typography variant="h5" className="news-standing-banner-text">
          Announcement
        </Typography>

        <StandingTable
          tableRowData={tableRowData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          headerClassName={'announcement-table-header'}
          tableHeaderData={AnnouncementPageStandingHeader}
          headerLongField={['Title']}
          rowLongField={['Title']}
          rowContentClassName={'announcement-table-row'}
          selectedRow={parseInt(selectedID) - rowsPerPage * page}
          rowClick={(id: number) => {
            const idx = id + page * rowsPerPage;

            void onChange(String(idx));
            history.push(`/announcement/${idx}`);
            scroller.scrollTo('selectedAnnouncement', {
              smooth: false,
              offset: -20,
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
            />
          }
        />
      </Box>
    </Box>
  );
};

export const AnnouncementTable = withTheme(styled(UnstyledAnnouncementTable)`
  .news-standing-banner-text {
    margin: 2rem 0 1rem 3rem;
    font-weight: bold;
  }

  .announcement-table-header {
    font-size: 1.06rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }

  .announcement-table-row {
    cursor: pointer;
  }

  .announcement-pagination {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    margin-right: 5.5rem;
    padding-bottom: 2rem;

    div svg {
      font-size: medium;
    }
  }
`);
