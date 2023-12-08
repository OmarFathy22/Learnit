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
import { doc, updateDoc, getDoc, runTransaction } from "firebase/firestore";
import { db } from "../../firebase/config";
import { BsCheck2Circle } from "react-icons/bs";
import { content1 } from "../../Data";
import ReactPlayer from "react-player";
import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import { Typography } from "@mui/material";
import Loading from "../Comp/loader/LoadEnroll";

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
  const [isEnrolled, setisEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleEnrolled = async () => {
    setLoading(true);
    const docRef = doc(db, "CoursesInProgress", user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLoading(false);
      setisEnrolled(
        docSnap?.data()?.data?.find((course) => course.id === currCourse.id)
      );
    } else {
      console.log("No such document!");
    }
    setLoading(false);
  };

  
  React.useEffect(() => {
    if (user) {
      handleEnrolled();
    }
  }, []);
  const handlePurchase = () => {
    if (!user) {
      console.log("open");
      handleOpen();
    } else {
      navigate('/payment')
    }
  }
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
          <div className=" w-full max-600:mt-7 mx-5">
            <div className="mt-[100px] mb-[50px] max-1300:flex-col   max-600:items-center w-full gap-5  flex items-start ">
              <div className="w-full flex-wrap h-full rounded-md min-1300:mb-[40px]">
                <div className="flex flex-col gap-3  ">
                  <div className="w-full border-[1px] rounded-lg">
                    <ReactPlayer
                      controls={true}
                      playing={false}
                      width="100%"
                      height="100%"
                      url={
                        "https://firebasestorage.googleapis.com/v0/b/e-learning-981e1.appspot.com/o/react%20course%2Freact%20course%2F%2302%20React%20full%20course%20with%20projects%202023%20%F0%9F%94%A5%F0%9F%94%A5.mp4?alt=media&token=a136251a-2bac-4b8b-bd9b-c7e0488b7cf9"
                      }
                      style={{ borderRadius: "10px", overflow: "hidden" }}
                    />
                  </div>
                  <div className="  border-2 border-gray-500 rounded-md p-8 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <BsBook />
                      <Typography>{currCourse.chapters} chapters</Typography>
                    </div>
                    <div>
                      <Typography sx={{ fontSize: "22px" }}>
                        {currCourse.title}
                      </Typography>
                      <p className="text-[#5f6368]">{currCourse.desc}</p>
                    </div>

                    {user ? (
                      <div></div>
                    ) : (
                      <Typography className="mt-3 text-[#4dbbe0]">
                        Free
                      </Typography>
                    )}
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                }}
                className="text-white max-600:w-[95%] w-[50%] max-1300:w-full  border-2 border-gray-500 rounded-md p-8 flex flex-col gap-2"
              >
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <Typography sx={{ fontSize: "23px" }}>
                      {!isEnrolled
                        ? "Ready to start building?"
                        : "Continue where you left off."}
                    </Typography>
                    <Typography>
                      {!isEnrolled
                        ? "Track your progress, watch with subtitles, change quality & speed, and more."
                        : "Watch from the last completed chapter."}
                    </Typography>
                    <button
                      onClick={() => {
                        if (!isEnrolled) {
                          handlePurchase()
                        } else {
                          navigate(`/courses/${currCourse.id}/chapters`);
                        }
                      }}
                      className="bg-gray-100 p-1 mt-3 hover:bg-gray-300 transition-all duration-300 text-black rounded-md"
                    >
                      {!isEnrolled ? "Continue to Purchase" : "Continue Learning"} 
                      {/* Enroll for free */}
                    </button>
                  </>
                )}
              </div>
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
