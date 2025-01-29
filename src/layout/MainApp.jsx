import { Suspense, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/main/NavBar";
import { Grid2, LinearProgress } from "@mui/material";
// import Sidebar from "../components/main/SideBar";
import { useSwipeable } from "react-swipeable";
import { ThemeContext } from "../theme/ThemeContext";
import SideBarNested from "../components/main/NestedList";

// Layout Component
const Layout = () => {
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
