
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
import MainContent from "../components/MainContentForBookmarks";
import DRAWER from "../components/DRAWER";
import UserProgress from "../Comp/Login/UserProgress";
import { BsBook } from "react-icons/bs";
const Root = (props) => {
  const { sub } = JSON.parse(localStorage.getItem("CurrUser"))
  const uId = sub;
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
          <div className="mt-[100px] w-full gap-5 borderr flex items-start ">
      <div className='w-[60%] ml-5 border-2 border-gray-500 rounded-md p-8 flex flex-col gap-3'>
        <div className="flex items-center gap-2">
          <BsBook/>
          <h1>22 chapters</h1>
        </div>
        <div>
          <h1 className="font-bold text-[22px] ">Fullstack Notion Clone</h1>
          <p className="text-[#5f6368]">In this 8 hour tutorial you will learn how to create an end-to-end fullstack notion clone, all with proper notion-style editor, cover images, nested documents, publishing documents to public, real-time database and more.</p>
        </div>
          <div className="flex items-center gap-2">
            <div className="border-[1px]  border-gray-300 py-1 px-2 rounded-md">Tailwind</div>
            <div className="border-[1px]  border-gray-300 py-1 px-2 rounded-md">React js</div>
            <div className="border-[1px]  border-gray-300 py-1 px-2 rounded-md">Next js</div>
          </div>
          <div>
            <UserProgress value={0}/>
            <h1 className="text-[13px] mt-1 text-blue-900">0% Complete</h1>
          </div>
      </div>
      <div style={{  backgroundImage: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",}} className='text-white w-[40%] border-2 border-gray-500 rounded-md p-8 flex flex-col gap-2'>
        <h1 className="font-bold text-[25px] ">Ready to start building?</h1>
         <h3>Track your progress, watch with subtitles, change quality & speed, and more.</h3>
         <button className="bg-gray-100 p-1 hover:bg-gray-300 transition-all duration-300 text-black rounded-md">Enroll for Free </button>
         <div className="flex justify-center items-center gap-3">
           <div className="h-[1px] w-[40%] bg-white"/>
           <h1>OR</h1>
           <div className="h-[1px] w-[40%] bg-white"/>
         </div>
         <button className="bg-gray-100 p-1 hover:bg-gray-300 transition-all duration-300 text-black rounded-md">Preview Course </button>
      </div>
      <div></div>
    </div>

        </Stack>
        {/* Main content is landing here */}

        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Root;
