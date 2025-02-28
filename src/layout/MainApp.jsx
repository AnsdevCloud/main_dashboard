import { Suspense, useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/main/NavBar";
import {
  Button,
  Card,
  CardContent,
  Grid2,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
// import Sidebar from "../components/main/SideBar";
import { useSwipeable } from "react-swipeable";
import { ThemeContext } from "../theme/ThemeContext";
import SideBarNested from "../components/main/NestedList";
import { motion } from "framer-motion";
// Layout Component
const Layout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("db-id"));
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);
  const { swipeFuns, handleSwipe, setIsSideBar, isSideBar } =
    useContext(ThemeContext);

  const toggleDrawer = (e) => {
    setIsSideBar(e || !isSideBar);
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe({ type: "left", value: true }),
    onSwipedRight: () => handleSwipe({ type: "right", value: true }),
    trackMouse: false, // Optional: Enable mouse tracking for desktop
  });
  if (!user) {
    return (
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card>
            <CardContent>
              <Stack alignItems={"center"} width={"100%"} gap={3}>
                <Typography variant="h4" color="primary">
                  Sorry ! , Yaur ID Not Found{" "}
                </Typography>
                <Button component={Link} to="/auth" color="info">
                  Check Now
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }
  return (
    <Grid2 container spacing={0}>
      <Grid2 size={{ xs: 12 }}>
        <NavBar />
      </Grid2>
      <Grid2 size={{ xs: 12 }} {...swipeHandlers}>
        <Grid2 container spacing={3}>
          <Grid2
            size={{ xs: 12, md: isSideBar ? 3 : 1, lg: isSideBar ? 3 : 0.5 }}
          >
            {/* <Sidebar isSideBar={isSideBar} toggleDrawer={toggleDrawer} /> */}
            <SideBarNested
              isOpen={isSideBar}
              toggleDrawer={(e) => toggleDrawer(e)}
            />
          </Grid2>
          <Grid2
            size={{ xs: 12, md: isSideBar ? 9 : 11, lg: isSideBar ? 9 : 11.5 }}
            height={"91vh"}
            sx={{ overflowY: "auto" }}
            px={1}
          >
            <Suspense fallback={<LinearProgress />}>
              <Outlet />
            </Suspense>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
export default Layout;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #ff8c00, #d83600)",
  },
  card: {
    padding: "30px",
    width: "350px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
    background: "#fff",
  },
  input: {
    marginTop: "15px",
  },
  button: {
    marginTop: "20px",
    background: "#d83600",
    "&:hover": { background: "#b02e00" },
  },
};
