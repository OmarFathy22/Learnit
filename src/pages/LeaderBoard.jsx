
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
import { data3 } from "../../Data";
const Root = (props) => {
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
          <div className="border-[1px] sm:yt-[120px] border-gray-200 my-[70px] w-full mx-7 rounded-md ">
            <div>
            <div  className={`m-2 px-2 py-1 rounded-md flex justify-between items-center sm:pr-[50px] pr-[100px] bg-[#dcd9d9]`} >
                    <div className="flex gap-2">
                      user
                    </div>
                    <div className="">
                      points
                    </div>
                  </div>
              {data3.map((item , index) => {
                return(
                  <div key={index} className={`mx-2 px-2 py-1 rounded-md flex justify-between items-center ${index %2 == 0 && "bg-[#dcd9d9]"}`} >
                    <div className="flex gap-2">
                      <div><img className="w-10 h-10 rounded-full" src={item.src} alt="" /></div>
                      <div>
                        <div>{item.name}</div>
                        <div>level {item.level}</div>
                      </div>
                    </div>
                    <div className="bg-[#7ee97eac] text-[#266e26] px-5 py-[1px] rounded-full sm:mr-[30px] mr-[80px]">
                      {item.points}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </Stack>
        {/* Main content is landing here */}

        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Root;
