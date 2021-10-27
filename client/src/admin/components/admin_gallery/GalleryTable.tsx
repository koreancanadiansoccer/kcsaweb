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
import { Gallery } from '../../../types/gallery';
import { UpdateShowGalleryInput } from '../../../graphql/gallery/update_gallery.mutation';

interface GalleryTableProps {
  className?: string;
  galleryData: Gallery[];
  showOnHomepageCount: number;
  onChange: (Gallery: UpdateShowGalleryInput, checked: boolean) => Promise<void>;
}


/**
 * admin Gallery Table.
 * Displays table of all Galleries
 */
const UnstyledGalleryTable: FunctionComponent<GalleryTableProps> = ({
  className,
  galleryData,
  showOnHomepageCount,
  onChange,
}) => {
  const tableColumns = [
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'Created', field: 'createdAt' },
    {
      title: 'Show On Homepage (Up to 3)',
      field: 'showOnHomepage',
      render: (data: Gallery) => (
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
                showOnHomepageCount == 3 && data.showOnHomepage == false
                  ? true
                  : false
              }
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                void onChange(data, evt.target.checked);
              }}
            />
          }
          label="Already Selected 3 Galleries"
        />
      ),
    },
  ];

  if (!galleryData) {
    return <div>loading...</div>;
  }

  return (
    <div className={className}>
      <Box>
        <Table
          title="Gallery List"
          columns={tableColumns}
          data={galleryData}
          options={{
            pageSize: 10,
            rowStyle: (data: Gallery) => {
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

export const GalleryTable = withTheme(styled(UnstyledGalleryTable)`
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
