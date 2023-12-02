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
import { toast, ToastContainer } from "react-toastify";
import UserProgress from "../Comp/Login/UserProgress";
import { BsBook } from "react-icons/bs";
import LoginModal from "../Comp/Login/LoginModal";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Root = (props) => {
  const navigate = useNavigate();
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
  const user = JSON.parse(localStorage.getItem("user"));
  const currCourse = JSON.parse(localStorage.getItem("currCourse"));
  const isEnrolled = user?.coursesInProgress?.some(
    (course) => course.id === currCourse.id
  );
  const updateUserCourses = async (user, currCourse) => {
    const docRef = doc(db, "Users", user?.uid);
    await updateDoc(docRef, {
      coursesInProgress: [...user.coursesInProgress, currCourse],
    });
    // update the user object in local storage
    const updatedUser = {
      ...user,
      coursesInProgress: [...user.coursesInProgress, currCourse],
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleEnroll = async () => {
    if (!user) {
      console.log("open");
      handleOpen();
    } else {
      try {
        const loadingToastId = toast.loading("Enrolling...", {
          autoClose: false,
        });

        await updateUserCourses(user, currCourse);

        toast.dismiss(loadingToastId);

        toast.success("Enrolled successfully 🎉");

        setTimeout(() => {
          navigate(`/courses/${currCourse.id}/chapters`)
          location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error during enrolling:", error);
        toast.dismiss(loadingToastId);
        toast.error("Could not enroll. Try again later 😞");
      }
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
          <div className="mt-[120px] sm:flex-col sm:items-center w-full gap-5 borderr flex items-start ">
            <div className="w-[60%] sm:w-[95%] min-600:ml-5 border-2 border-gray-500 rounded-md p-8 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <BsBook />
                <h1>{currCourse.chapters} chapters</h1>
              </div>
              <div>
                <h1 className="font-bold text-[22px] ">{currCourse.title}</h1>
                <p className="text-[#5f6368]">{currCourse.desc}</p>
              </div>
              {/* <div className="flex items-center gap-2">
                <div className="border-[1px]  border-gray-300 py-1 px-2 rounded-md">
                  Tailwind
                </div>
                <div className="border-[1px]  border-gray-300 py-1 px-2 rounded-md">
                  React js
                </div>
                <div className="border-[1px]  border-gray-300 py-1 px-2 rounded-md">
                  Next js
                </div>
              </div> */}
              {user ? (
                <div>
                  <UserProgress value={0} />
                  <h1 className="text-[13px] mt-1 text-blue-900">
                    0% Complete
                  </h1>
                </div>
              ) : (
                <h1 className="mt-3 text-[#4dbbe0]">Free</h1>
              )}
            </div>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
              }}
              className="text-white sm:w-[95%] w-[40%] border-2 border-gray-500 rounded-md p-8 flex flex-col gap-2"
            >
              <h1 className="font-bold text-[25px] ">
                {!isEnrolled
                  ? "Ready to start building?"
                  : "Continue where you left off."}
              </h1>
              <h3>
                {!isEnrolled
                  ? "Track your progress, watch with subtitles, change quality & speed, and more."
                  : "Watch from the last completed chapter."}
              </h3>
              <button
                onClick={() => {
                  if(!isEnrolled){
                    handleEnroll()    
                  }
                  else{
                    navigate(`/courses/${currCourse.id}/chapters`)
                  }
                }}
                className="bg-gray-100 p-1 mt-3 hover:bg-gray-300 transition-all duration-300 text-black rounded-md"
              >
                {!isEnrolled ? "Enroll for Free" : "Continue Learning"}
              </button>
            </div>
            <LoginModal open={open} handleClose={handleClose} />
            <div></div>
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
