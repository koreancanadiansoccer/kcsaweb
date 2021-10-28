import React, {
  FunctionComponent,
  ChangeEvent,
} from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Table } from '../../../components/table/Table';
import { Announcement } from '../../../types/announcement';
import { UpdateShowAnnouncementInput } from '../../../graphql/announcement/update_announcement.mutation';

interface AnnouncementTableProps {
  className?: string;
  announcementData: Announcement[];
  showOnHomePageCount: number;
  onChange: (Announcement: UpdateShowAnnouncementInput, checked: boolean) => Promise<void>;
}
/**
 * admin Announcement Table.
 * Displays table of all Announcements
 */

const UnstyledAnnouncementTable: FunctionComponent<AnnouncementTableProps> = ({
  className,
  announcementData,
  showOnHomePageCount,
  onChange,
}) => {
  const tableColums = [
    { title: 'Title', field: 'title' },
    { title: 'Subtitle', field: 'subtitle' },
    { title: 'Image URL', field: 'imageURL' },
    { title: 'Created', field: 'createdAt' },
    {
      title: 'Show On Homepage (Up to 5)',
      field: 'showOnHomepage',
      render: (data: Announcement) => (
        <FormControlLabel
          className={
            data.showOnHomepage
              ? 'table-form show-main'
              : 'table-form hide-main'
          }
          control={
            <Checkbox
              checked={data.showOnHomepage}
              color="primary"
              disabled={
                showOnHomePageCount == 5 && data.showOnHomepage == false
                  ? true
                  : false
              }
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                void onChange(data, evt.target.checked);
              }}
            />
          }
          label="Already Selected 5 Announcement"
        />
      ),
    },
  ];

  if (!announcementData) {
    return <div>loading...</div>;
  }

  return (
    <div className={className}>
      <Box>
        <Table
          title="Annoucement Info"
          columns={tableColums}
          data={announcementData}
          options={{
            pageSize: 10,
            rowStyle: (data: Announcement) => {
              return data.showOnHomepage
                ? { background: 'white' }
                : { background: '#EEEEEE' };
            },
          }}
        />
      </Box>
    </div>
  );
};

export const AnnouncementTable = withTheme(styled(UnstyledAnnouncementTable)`
  .table-form {
    margin-left: 4rem;

    .MuiIconButton-colorPrimary:hover {
      color: #f17f42;
    }
  }

  .Mui-disabled:hover {
    .MuiFormControlLabel-label {
      visibility: visible;
      opacity: 1;
    }
  }

  .MuiFormControlLabel-label {
    color: red;
    font-size: 0.7rem;
    visibility: hidden;
    transition: opacity 0.5s;
    opacity: 0;
  }
`);
