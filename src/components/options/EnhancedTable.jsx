import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  TextField,
  Stack,
  Alert,
} from "@mui/material";

// Utility function to check for nested objects
const hasNestedObjects = (data) => {
  for (let row of data) {
    for (let key in row) {
      if (typeof row[key] === "object" && row[key] !== null) {
        return true;
      }
    }
  }
  return false;
};

function EnhancedTable({ tableData, sheetName }) {
  if (!tableData || tableData.length === 0) {
    return (
      <Alert variant="filled" severity="warning">
        No Data Available - Sheet Info : {sheetName}
      </Alert>
    );
  }

  // Check for nested objects and throw an alert
  if (hasNestedObjects(tableData)) {
    return (
      <Alert variant="filled" severity="error">
        Invalid Data Structure - Sheet Info : {sheetName}
      </Alert>
    );
  }

  // Extract dynamic keys
  const keys = Object.keys(tableData[0]);

  // States
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(keys[0]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting function
  const handleSort = (key) => {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  };

  const sortedData = tableData
    .filter((row) =>
      keys.some((key) =>
        String(row[key]).toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });

  // Pagination function
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={0} sx={{ width: "100%", padding: 2 }}>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        alignContent={"center"}
        justifyContent={"space-around"}
        width={"100%"}
        gap={2}
        mb={2}
      >
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          size="small"
          color="info"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          id="outlined-read-only-input"
          label="Sheet Name "
          fullWidth
          size="small"
          defaultValue="Hello World"
          disabled
          value={sheetName || 0}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
      </Stack>
      <Paper elevation={0} sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ overflow: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            {/* Table Header */}
            <TableHead>
              <TableRow>
                {keys.map((key) => (
                  <TableCell
                    key={key}
                    align="center"
                    sortDirection={orderBy === key ? order : false}
                    sx={{ fontWeight: 600 }}
                    colSpan={3}
                  >
                    <TableSortLabel
                      active={orderBy === key}
                      direction={orderBy === key ? order : "asc"}
                      onClick={() => handleSort(key)}
                    >
                      {key.toUpperCase()}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={index}>
                  {keys.map((key) => (
                    <TableCell colSpan={3} key={key} align="center">
                      {row[key] !== undefined ? row[key] : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 45, 65, 85, 100]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Paper>
  );
}

export default EnhancedTable;
