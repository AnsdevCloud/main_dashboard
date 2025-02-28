import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { BiUser, BiWorld } from "react-icons/bi";
import { Link } from "react-router-dom";
const siteRef = [
  {
    name: "Plans Compare",
    url: "https://enivesh.co.in/insurance/plans",
    source: "Enivesh.co.in",
  },
  {
    name: "DACL",
    url: "https://enivesh.co.in/dacl",
    source: "Enivesh.co.in",
  },
  {
    name: "Plans Upload",
    url: "https://enivesh.co.in/admin",
    source: "Enivesh.co.in",
  },
  {
    name: "Find Plans ",
    url: "https://enivesh.co.in/insurance/",
    source: "Enivesh.co.in",
  },
];
const Pages = () => {
  return (
    <Paper sx={{ p: 1 }} elevation={0}>
      <Grid2 container spacing={1}>
        {siteRef?.map((d, i) => (
          <Grid2 key={i} size={{ xs: 12, md: 4 }}>
            <Card elevation={0} variant="outlined">
              <CardHeader
                avatar={<BiWorld color="#ff5c00" />}
                title={d?.source}
                action={
                  <Button component={Link} to={d?.url} target="_blank">
                    Open
                  </Button>
                }
              />
              <CardContent sx={{ px: 2, py: 0 }}>
                <Typography variant=" " component={"h2"}>
                  {d?.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Paper>
  );
};

export default Pages;
