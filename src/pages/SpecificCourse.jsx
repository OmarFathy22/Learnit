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
import DRAWER from "../components/ContentDRAWER ";
import { toast, ToastContainer } from "react-toastify";
import UserProgress from "../Comp/Login/UserProgress";
import { BsBook } from "react-icons/bs";
import LoginModal from "../Comp/Login/LoginModal";
import { Player } from "video-react";
import "video-react/dist/video-react.css"; // import css

const Root = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showList, setshowList] = useState("none");
  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const toastId = React.useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleEnroll = (params) => {
    console.log("enroll");
    if (Object.keys(user).length === 0) {
      console.log("open");
      handleOpen();
    } else {
      const performSignIn = async () => {
        try {
          // Show a loading toast while the promise is pending
          const promise = new Promise((resolve) => {
            setTimeout(() => {
              resolve(console.log("done")); // Replace with your actual promise-based operation
            }, 1500); // Simulate a one-second delay
          });

          toast.promise(promise, {
            pending: "Enrolling...",
            success: "Enrolled successfully 🎉",
            error: "Could not enroll. Try again later 😞",
          });
        } catch (error) {
          // Handle any errors here
          console.error("Error during enrolling:", error);
        }
      };

      // Call the performSignIn function to initiate the sign-in process
      performSignIn();
    }
  };
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
          <div className="w-full h-full mt-[100px] mx-3 sm:mt-[120px] rounded-md mb-[40px]">
              <Player>
                <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
              </Player>
            </div>
        </Stack>

        {/* Main content is landing here */}
        {/* <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          closeOnClick={true}
        /> */}
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default Root;
