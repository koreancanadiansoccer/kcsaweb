import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import dayjs from 'dayjs';

import { Announcement } from '../../../types/announcement';

interface AnnouncementProps {
  className?: string;
  announcement: Announcement;
  maxLength: number;
  moveClick?: (id: number) => Promise<void>;
}

/**
 * Selected Announcement detail.
 */
const UnstyledAnnouncementDetail: FunctionComponent<AnnouncementProps> = ({
  className,
  announcement,
  maxLength,
  moveClick,
}) => {
  return (
    <Box className={className} pt={10}>
      <Paper
        elevation={3}
      >
        <Box py={6}>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            justifyContent="space-between"
            mb={4}
            px={10}
          >
            <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">
              {announcement.title}
            </Box>

            <Box fontSize="h6.fontSize" fontWeight="fontWeightBold">
              {dayjs(announcement.createdAt, 'YYYY-MM-DDTHH:mm').format(
                'YYYY. MM. DD'
              )}
            </Box>
          </Box>
          <Divider />

          <Box px={10}>
            {announcement.imageURL && (
              <Box my={4}>
                <img
                  src={announcement.imageURL}
                  alt="Announcement Image"
                  className="announcement-image"
                />
              </Box>
            )}
            <Box pr={40}>{ReactHtmlParser(announcement.content)}</Box>

            <Box
              className={announcement.id === String(maxLength) ? 'annoucement-pagination' : ''}
              display="flex"
              justifyContent="space-between"
              mt={5}
            >
              {announcement.id !== String(maxLength) && (
                <Box
                  display="flex"
                  className="announcement-detail-pagination"
                  onClick={
                    moveClick
                      ? () => {
                          const idx = maxLength - parseInt(announcement.id) - 1;
                          void moveClick(idx);
                        }
                      : undefined
                  }
                >
                  <ArrowBackIos />

                  <Box fontSize={16} fontWeight="bold" pt={0.24} mr={2}>
                    PREV
                  </Box>
                </Box>
              )}

              {announcement.id !== '1' && (
                <Box
                  display="flex"
                  className={'announcement-detail-pagination'}
                  onClick={
                    moveClick
                      ? () => {
                          const idx = maxLength - parseInt(announcement.id) + 1;
                          void moveClick(idx);
                        }
                      : undefined
                  }
                >
                  <Box fontSize={16} fontWeight="bold" pt={0.24} mr={2}>
                    NEXT
                  </Box>

                  <ArrowForwardIos />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export const AnnouncmentDetail = withTheme(styled(UnstyledAnnouncementDetail)`
  .announcement-image {
    max-width: 100%;
    max-height: 30rem;
    border-radius: 10px;
  }

  .annoucement-pagination {
    justify-content: flex-end;
  }

  .announcement-detail-pagination {
    cursor: pointer;
  }
`);
