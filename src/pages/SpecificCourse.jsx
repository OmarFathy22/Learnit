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
import LoadingSpinner from "../components/Loading";
import "video-react/dist/video-react.css"; // import css
import ReactPlayer from "react-player";
import {BsCheck2Circle} from 'react-icons/bs'
import { content1 } from "../../Data";


// Render a YouTube video player

const Root = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [curr, setCurr] = useState(0);
  const [showList, setshowList] = useState("none");
  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const handleUpdate = (params) => {
     setCurr((prev) => (prev + 1)% content1.length);
     const performSignIn = async () => {
      try {
        // Show a loading toast while the promise is pending
        const promise = new Promise((resolve) => {
          setTimeout(() => {
            resolve(console.log("done")); // Replace with your actual promise-based operation
          }, 1500); // Simulate a one-second delay
        });
    
        toast.promise(promise, {
          pending: 'Updating Progress...',
        success: 'Progress Updated ',
          error: 'Could not update. Try again later ',
        });
      } catch (error) {
        // Handle any errors here
        console.error('Error during updating:', error);
      }
    };
      performSignIn();
  }
  React.useEffect(() => {
   setLoading(false)
  }, [loading]);

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
            setCurr={setCurr}
            curr={curr}
          />
          <div className="w-full h-[85vh] pb-10 mb-10  flex flex-col justify-center items-center mt-[100px] mx-3 sm:mt-[120px] rounded-md mb-[40px]">
            {loading ? (
              <LoadingSpinner />
            ) : (
              // <Player autoPlay={true}>
              //   <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
              // </Player>
              <div className="w-full h-[100%]" >
                <ReactPlayer
                  controls={true}
                  playing={true}
                  width="100%"
                  height="100%"
                  url={content1[curr ]}
                  style={{ borderRadius: "10px" , overflow:"hidden" }}
                  onReady={() =>{
                    setLoading(false);
                  }}
                
                />
          <div className=" pb-10">
            <div className="flex  justify-between border-[1px] border-gray-300 mt-3 p-5 rounded-[10px]">
                <h1 className="font-bold text-[20px]">Episode {curr + 1}</h1>
                 <button onClick={handleUpdate} className="bg-green-600 rounded-md p-1 px-2 text-white flex items-center gap-1">Mark as complete <BsCheck2Circle/></button>
            </div>
          </div>
              </div>
            )}
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
