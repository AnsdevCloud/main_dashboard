import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/config";
import { Card, CardContent, Grid2, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PurchaseList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "purchase"),
      (snapshot) => {
        const asets = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(asets);
      }
    );

    // Cleanup function to unsubscribe from real-time listener when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <Grid2 container spacing={2}>
      {data?.map((d, i) => (
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card key={i} sx={{ position: "relative" }}>
            <CardContent>
              <Typography
                variant="subtitle1"
                component={"h2"}
                textTransform={"uppercase"}
                fontWeight={600}
                color="initial"
              >
                {d?.itc}
              </Typography>
              <Link to={d?.bill?.url}>Open</Link>
              <Typography
                position={"absolute"}
                right={4}
                bottom={4}
                variant="body2"
                color="grey"
              >
                {d?.year}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default PurchaseList;
