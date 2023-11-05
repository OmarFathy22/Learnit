
import {
  Box,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import Appbar from "../components/Appbar";
import React, { useMemo, useState , useEffect } from "react";
import getDesignTokens from "../styles/MyTheme";
import MainContent from "../components/MainContent";
import DRAWER from "../components/DRAWER";

// import RightDrawer from "../components/RightDrawer";
const Root = (props) => {
  useEffect(() => {
  
  }, []);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [showList, setshowList] = useState("none");
  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
          backgroundColor:
            theme.palette.mode === "light" ? " rgb(248, 248, 248)" : null,
          minHeight: "100vh !important",
        }}>
        {/* Appbar is landing here */}
        <Appbar
          showList={showList}
          setshowList={setshowList}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Stack direction="row">
          <DRAWER
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            props={props}
            theme={theme}
            mode={mode}
            setmyMode={setmyMode}
          />
          <MainContent theme={theme}  uid={"AllPosts"} />
          {/* <RightSection theme={theme} /> */}
          {/* <RightDrawer theme={theme} /> */}
          <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}

       />
        </Stack>
        {/* <Outlet /> */}
      </Box>

    </ThemeProvider>
  );
};

export default Root;
