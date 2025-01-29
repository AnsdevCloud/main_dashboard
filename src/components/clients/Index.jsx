import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const data = [
    { name: "John", details: "Software Developer" },
    { name: "Alice", details: "Product Manager" },
    { name: "Bob", details: "Designer" },
    { name: "Tom", details: "QA Engineer" },
  ];
  const MyCard = ({ addLink, viewLink, title, data = [] }) => (
    <Card>
      <CardContent>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          alignContent={"center"}
          width={"100%"}
        >
          <Typography
            variant="subtitle1"
            component={"h1"}
            fontSize={"1.5em"}
            color="grey"
            fontWeight={600}
            my={1}
          >
            {title}
          </Typography>
        </Stack>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: "12px", padding: "4px 8px" }}>
                    {row?.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", padding: "4px 8px" }}>
                    {row?.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <Button
          to={addLink || ""}
          component={Link}
          fullWidth
          size="small"
          color="primary"
          variant="outlined"
        >
          Add Deatails
        </Button>
        <Button
          to={viewLink || ""}
          component={Link}
          fullWidth
          size="small"
          color="secondary"
          variant="outlined"
        >
          Veiw Deatials
        </Button>
      </CardActions>
    </Card>
  );
  return (
    <>
      <Grid2 container spacing={1} p={1}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard
            addLink={"parsonal"}
            title={"Parsonal Details"}
            viewLink={"profile"}
            data={data}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard
            addLink={"communication"}
            title={"Cominication Details"}
            data={data}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard addLink={"family"} title={"Family Members"} data={data} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard title={"Bank Details"} data={data} addLink={"bank"} />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard title={"Doccumemts"} data={data} addLink={"documents"} />
        </Grid2>
      </Grid2>
    </>
  );
};

export default Index;
