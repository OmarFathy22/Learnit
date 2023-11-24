
import {
  Box,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import Appbar from "../components/Appbar";
import React, { useMemo, useState } from "react";
import { Outlet } from "react-router";
import getDesignTokens from "../styles/MyTheme";
import DRAWER from "../components/DRAWER";
import Button from '@mui/material/Button';
import Modal from '../Comp/Instructor/Modal'
import { data3 } from "../../Data";
const Root = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [showList, setshowList] = useState("none");
  const [open, setOpen] = useState("none");
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);


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
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "light" ? " rgb(248, 248, 248)" : null,
          minHeight: "100vh !important",
        }}
      >
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
          <div className=" sm:mt-[120px] flex justify-center items-center  h-[90vh] border-gray-200 my-[100px] pb-2 w-full mx-7 rounded-md ">
          <Button variant="contained" onClick={() => {
            handleOpen();
          }}>Become an Instructor</Button>
          <Modal open={open} handleClose={handleClose}/>

          </div>
        </Stack>
        {/* Main content is landing here */}

        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Root;
