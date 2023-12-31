import {
  Box,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import Appbar from "../components/Appbar";
import React, { useMemo, useState, useEffect } from "react";
import getDesignTokens from "../styles/MyTheme";
import MainContent from "../components/MainContent";
import DRAWER from "../components/DRAWER";
import Footer from "../components/Footer";
import { courses } from "../../Data";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Root = (props) => {
  React.useEffect(() => {
    const SaveData = async () => {
      await setDoc(doc(db, "Courses", "data"), {
        data: courses,
      });
    };
    // SaveData();
  }, []);
  useEffect(() => {}, []);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [MainCourses, setMainCourses] = useState([]);
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
          theme={theme}
          setMainCourses={setMainCourses}
          MainCourses={MainCourses}
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
          <MainContent
            MainCourses={MainCourses}
            setMainCourses={setMainCourses}
            theme={theme}
          />
        </Stack>
        {/* <Footer/> */}
        {/* <Outlet /> */}
      </Box>
    </ThemeProvider>
  );
};

export default Root;
