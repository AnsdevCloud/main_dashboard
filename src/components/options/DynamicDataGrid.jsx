import React, { useState } from "react";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DynamicDataGrid = ({ data }) => {
  // Extract dynamic columns from the first row
  const columns = Object.keys(data[0] || {})?.map((key) => ({
    field: key,
    headerName: key.toUpperCase(), // Convert key to uppercase for header
    width: 150,
  }));

  // Generate rows with unique IDs for DataGrid
  const rows = data.map((row, index) => ({
    id: index + 1, // Add unique ID for each row
    ...row,
  }));

  // State for current page
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={[5, 10, 25, 45, 60, 100]}
        disableColumnMenu
        sx={{
          border: 0,
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "action.hover",
          },
        }}
      />
    </Paper>
  );
};

export default DynamicDataGrid;
