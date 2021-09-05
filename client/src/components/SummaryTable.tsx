import React, { FunctionComponent } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { useQuery } from "@apollo/client";

import { HeaderRow } from "./HeaderRow";
import { GET_USERS } from "../graphql/users/get_users.query";

interface SummaryTableProps {
  title: string;
}

// Simple summary table on home page.
export const SummaryTable: FunctionComponent<SummaryTableProps> = ({
  title,
}) => {
  /**BELOW QUERY IS EXMAPLE TO SHOW CONNETION BETWEEN GQL AND FRONTEND - TODO: REMOVE */
  const { loading, error, data } = useQuery(GET_USERS);
  console.log("data!!");
  console.log(data.getUsers);
  /** */

  return (
    <Box width={1 / 4}>
      <Paper elevation={3}>
        <Box px={2} py={2}>
          {/* <Typography
            align="center"
            // variant="h5"
          > */}
          <Box fontWeight="fontWeightBold" textAlign="center" my={2}>
            {title}
          </Box>

          <HeaderRow />

          {/* ranks */}

          <Box display="flex" justifyContent="space-around">
            <Box>1</Box>
            <Box>Gunners</Box>
            <Box>5</Box>
            <Box>+15</Box>
            <Box>20</Box>
          </Box>
          <Box display="flex" justifyContent="space-around">
            <Box>2</Box>
            <Box>Outliers</Box>
            <Box>5</Box>
            <Box>+15</Box>
            <Box>20</Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
