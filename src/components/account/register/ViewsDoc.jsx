import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import TransparentBox from "../../options/TransparentBox";
import HeadlineTag from "../../options/HeadlineTag";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DocumentScanner } from "@mui/icons-material";
import dayjs from "dayjs";

const ViewsDoc = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate("/account/register/sale-overview");
    }
  }, []);
  return (
    <Grid2 container spacing={1} p={2}>
      <Grid2
        size={{ xs: 12 }}
        position={"sticky"}
        top={0}
        zIndex={10}
        bgcolor={(theme) => theme?.palette?.background?.default}
      >
        <Grid2 container spacing={1} p={1}>
          <Grid2 size={{ xs: 12 }}>
            <HeadlineTag>
              Views Details{" "}
              <Button component={Link} to={-1}>
                Back
              </Button>
            </HeadlineTag>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <TransparentBox
              value={state?.company}
              rupeeLabal={false}
              // fontSize={25}
              caption={"12423"}
            ></TransparentBox>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 5 }}>
            <TransparentBox
              value={state?.totalAmount}
              rgbColor="rgb(66, 181, 4)"
              caption={"Total Sales"}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <TransparentBox
              rgbColor="rgb(4, 95, 181)"
              value={state?.invoices?.length}
              rupeeLabal={false}
              caption={"All Invoices"}
            ></TransparentBox>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 12 }} p={2}>
        <HeadlineTag>Invoices</HeadlineTag>
        {state?.invoices?.map((value, index) => (
          <Card variant="outlined" key={index}>
            <CardContent>
              <Stack
                position={"relative"}
                flexDirection={"row"}
                width={"100%"}
                alignItems={"start"}
                justifyContent={"flex-start"}
              >
                <Stack flexDirection={"row"} alignItems="center" width={"45%"}>
                  <DocumentScanner sx={{ fontSize: 50, color: "#00f" }} />
                  <Typography variant="caption" component={"p"}>
                    Inv No . {value?.invoicenumber}
                  </Typography>
                </Stack>
                <Typography
                  position={"absolute"}
                  bottom={0}
                  right={0}
                  variant="caption"
                  component={"p"}
                  color="grey"
                >
                  Date : {dayjs(value?.date).format("DD MMMM YYYY")}
                </Typography>
                <Typography
                  position={"absolute"}
                  top={0}
                  right={0}
                  variant="body2"
                  component={Button}
                  disabled
                  to="#"
                  color="blue"
                >
                  Open Doc
                </Typography>

                <Box width={"50%"}>
                  <Typography
                    color="grey"
                    variant="caption"
                    fontWeight={600}
                    mb={0.2}
                    component={"h1"}
                  >
                    Description
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="caption"
                    fontWeight={500}
                    mb={2}
                    component={"h1"}
                  >
                    {value?.description}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Grid2>
    </Grid2>
  );
};

export default ViewsDoc;
