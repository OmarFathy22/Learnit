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
import { toast } from "react-toastify";
import LoadingSpinner from "../components/Loading";
  import ReactPlayer from "react-player";
import { BsCheck2Circle } from "react-icons/bs";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../firebase/config";


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
  const user = JSON.parse(localStorage.getItem("user"));
  const currCourse = JSON.parse(localStorage.getItem("currCourse"));
  const handleUpdate = async () => {
    const handleUpdatePoints = async (params) => {
      const docRef = doc(db, "Users", user?.uid);
      await runTransaction(db, async (transaction) => {
        const doc = await transaction.get(docRef);
        const currentPoints = doc.data().points;

        // Update points with the new value
        transaction.update(docRef, { points: currentPoints + 20 });
      });
    };
    handleUpdatePoints();
    setCurr((prev) => (prev + 1) % currCourse?.content.length);
    const performSignIn = async () => {
      try {
        // Show a loading toast while the promise is pending
        const promise = new Promise((resolve) => {
          setTimeout(() => {
            resolve(console.log("done")); // Replace with your actual promise-based operation
          }, 1000); // Simulate a one-second delay
        });

        toast.promise(promise, {
          pending: "Updating Progress...",
          success: "Progress Updated ",
          error: "Could not update. Try again later ",
        });
      } catch (error) {
        // Handle any errors here
        console.error("Error during updating:", error);
      }
    };
    performSignIn();
  };
  React.useEffect(() => {
    setLoading(false);
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
          <div className="w-full h-full max-600:mt-[120px]  pb-10   flex flex-col justify-center items-center mt-[100px] mx-3 sm:mt-[120px] rounded-md mb-[40px]">
            {loading ? (
              <LoadingSpinner />
            ) : (
              // <Player autoPlay={true}>
              //   <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
              // </Player>
              <div className="w-full h-[100%] ">
                <ReactPlayer
                  controls={true}
                  playing={true}
                  muted={true}
                  width="100%"
                  height="100%"
                  url={currCourse?.content[curr].url}
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                  onReady={() => {
                    setLoading(false);
                  }}
                />
                <div className=" pb-10">
                  <div className="flex items-baseline justify-between border-[1px] border-gray-300 mt-3 p-3 rounded-[10px]">
                    <h1 className="font-bold text-[20px] max-600:text-[13px]">
                      Lesson {curr + 1}
                    </h1>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 rounded-md p-1 px-2 text-white flex items-center gap-1 max-600:text-[13px]"
                    >
                      Mark as complete <BsCheck2Circle />
                    </button>
                  </div>
                </div>
                <h1 className="text-center font-bold  border-b-1 border-b-black underline">
                  Quick Quiz
                </h1>
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
