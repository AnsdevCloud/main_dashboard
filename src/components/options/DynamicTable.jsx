import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const DynamicTable = ({ data = [] }) => {
  // Check if data is available
  if (!data || data.length === 0) return <p>No Data Found</p>;

  // Extract keys from the first object dynamically
  const columns = Object.keys(data[0]);

  return (
    <TableContainer>
      <Table
        className="scribe-table"
        border="1"
        style={{ width: "100%", textAlign: "left" }}
      >
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell align="center" key={index}>
                {col}
              </TableCell> // Dynamically render table headers
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>{row[col]}</TableCell> // Access values dynamically
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
