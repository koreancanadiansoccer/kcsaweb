import React, { FunctionComponent, useEffect, useState } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

interface PaginationProps {
  className?: string;
  imageLength: number;
  onChange: (page: number) => Promise<void>;
  activePage: number;
  rowsPerPage: number;
}

/**
 * Pagination
 */
const UnstyledPagination: FunctionComponent<PaginationProps> = ({
  className,
  imageLength,
  onChange,
  activePage,
  rowsPerPage,
}) => {
  const [lastPage, SetLastPage] = useState(0);

  useEffect(() => {
    if (activePage > -1 && imageLength > 0) {
      SetLastPage(imageLength % rowsPerPage == 0
                  ? imageLength / rowsPerPage
                  : Math.ceil(imageLength / rowsPerPage))
    }
  })

  const prevPageChange = () => {
    if (activePage > 0) {
      void onChange(activePage - 1);
    }
  }

  const nextPageChange = () => {
    if (activePage < lastPage - 1) {
      void onChange(activePage + 1);
    }
  }

  return (
    <Box className={className}>
      <Box className={activePage != 0 ? "first-page" : "non-cursor"} onClick={() => { void onChange(0) }}>
        <ArrowBackIos />
        <ArrowBackIos className="first-page-button" />
      </Box>

      <Box className={activePage != 0 ? "prev-page" : "non-cursor"} onClick={prevPageChange} ml={3}>
        <ArrowBackIos />
      </Box>

      <Typography
        component="div"
        variant="body2"
        className="page-number"
      >
        {activePage + 1}-{lastPage} of {lastPage}
      </Typography>

      <Box className={activePage + 1 != lastPage? "next-page" : "non-cursor"} onClick={nextPageChange} mr={3}>
        <ArrowForwardIos />
      </Box>

      <Box className={activePage + 1 != lastPage ? "last-page" : "non-cursor"} onClick={() => { void onChange(lastPage - 1) }}>
        <ArrowForwardIos className="last-page-button" />
        <ArrowForwardIos />
      </Box>
    </Box>
  );
};

export const Pagination = withTheme(styled(UnstyledPagination)`
  .non-cursor {
    cursor: default;
    opacity: 0.3;
  }

  .first-page {
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      color: #f17f42;
    }
  }

  .first-page-button {
    margin-left: -20px;
  }

  .prev-page {
    cursor: pointer;

    &:hover {
      color: #f17f42;
    }
  }

  .page-number {
    margin: 0 3rem 0 3rem;
    padding-bottom: 0.3rem;
  }

  .next-page {
    cursor: pointer;

    &:hover {
      color: #f17f42;
    }
  }

  .last-page {
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      color: #f17f42;
    }
  }

  .last-page-button {
    margin-right: -20px;
  }

  .MuiSvgIcon-root {
    font-size: 2rem;
  }
`);
