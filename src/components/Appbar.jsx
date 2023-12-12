/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import LoginButton from "../Comp/Login/LoginButton";
import LoginModal from "../Comp/Login/LoginModal";
import AvatarPage from "../Comp/Login/Avatar";
// import {ToggleModeComponent} from './ContentDRAWER ';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState } from "react";
import getDesignTokens from "../styles/MyTheme";
import ToggleButton from './ContentDRAWER '

export default function PrimarySearchAppBar({
  showList,
  setshowList,
  handleDrawerToggle,
  theme,
  setMainCourses,
  MainCourses
}) {

  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box>
      <AppBar
        position="fixed"
        className="bg-[#4dbbe0] max-600:!pb-2"
        sx={{
          width: { md: `calc(100% - 300px)` },
          zIndex: "1300px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div
            className={`max-600:hidden  ${pathname.includes("courses") && "hidden"} !`}
          >
            <SearchBar MainCourses={MainCourses} setMainCourses={setMainCourses} theme={theme} />
          </div>
          <div>
            {/* <ToggleModeComponent theme={theme} setmyMode={setmyMode}/> */}
          </div>
          
          <Box sx={{ flexGrow: { xs: "1" } }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* <Notifications /> */}
            <div style={{ width: "100% !important" }}>
              {user? (
                <AvatarPage user={user} />
              ) : (
                <div>
                  <LoginButton handleOpen={handleOpen} />
                  <LoginModal open={open} handleClose={handleClose} />
                </div>
              )}
            </div>
          </Box>
        </Toolbar>
        <Divider className="max-600:hidden" />
        <div className="min-600:hidden mx-3 rounded-md overflow-hidden">
          <SearchBar MainCourses={MainCourses} setMainCourses={setMainCourses} theme={theme} />
        </div>
      </AppBar>
    </Box>
  );
}
