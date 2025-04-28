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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [data, setData] = useState();
  // const data = [
  //   { name: "John", details: "Software Developer" },
  //   { name: "Alice", details: "Product Manager" },
  //   { name: "Bob", details: "Designer" },
  //   { name: "Tom", details: "QA Engineer" },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://db.enivesh.com/firestore/single/crm_clients/enw6jm",
          {
            headers: {
              "x-api-key": "5cf783e5-51a5-4dcc-9bc5-0b9a414c88a3",
              "Content-Type": "application/json",
            },
          }
        );
        setData(response?.data);

        console.log("response.data?.documents: ", response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          Add Details
        </Button>
        <Button
          to={viewLink || ""}
          component={Link}
          fullWidth
          size="small"
          color="secondary"
          variant="outlined"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
  return (
    <>
      <Grid2 container spacing={1} p={1}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard
            addLink={"/crm/parsonal"}
            title={"Personal Details"}
            viewLink={"/crm/clients"}
            data={
              [
                // {
                //   name: data?.fname,
                //   details: data?.clientType?.split("-")?.join(" "),
                // },
                // { name: "Alice", details: "Product Manager" },
                // { name: "Bob", details: "Designer" },
                // { name: "Tom", details: "QA Engineer" },
              ]
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard
            addLink={"/crm/communication"}
            title={"Communication Details"}
            viewLink={"/crm/clients"}
            data={
              [
                // { name: "John", details: "Software Developer" },
                // { name: "Alice", details: "Product Manager" },
                // { name: "Bob", details: "Designer" },
              ]
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard
            addLink={"/crm/family"}
            title={"Family/Group Members"}
            viewLink={"/crm/clients"}
            data={
              [
                // {
                //   name: data?.fname,
                //   details: data?.clientType?.split("-").join(" "),
                // },
                // { name: "Alice", details: "Product Manager" },
                // { name: "Bob", details: "Designer" },
                // { name: "Tom", details: "QA Engineer" },
              ]
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard
            title={"Bank Details"}
            data={
              [
                // { name: "John", details: "Software Developer" },
                // { name: "Alice", details: "Product Manager" },
                // { name: "Bob", details: "Designer" },
                // { name: "Tom", details: "QA Engineer" },
              ]
            }
            addLink={"/crm/bank"}
            viewLink={"/crm/clients"}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard
            title={"Documents"}
            data={
              [
                // { name: "John", details: "Software Developer" },
                // { name: "Alice", details: "Product Manager" },
                // { name: "Bob", details: "Designer" },
                // { name: "Tom", details: "QA Engineer" },
              ]
            }
            addLink={"/crm/documents"}
            viewLink={"/crm/clients"}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <MyCard
            title={"Lead Source"}
            data={
              [
                // { name: "Social", details: "Facebook" },
                // { name: "Sourcing", details: "" },
                // { name: "Policy ", details: "" },
                // { name: "Officer", details: "" },
              ]
            }
            addLink={"/crm/leads"}
            viewLink={"/crm/clients"}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default Index;
