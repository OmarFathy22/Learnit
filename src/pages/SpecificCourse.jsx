import {
  Box,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import Appbar from "../components/Appbar";
import React, { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";
import getDesignTokens from "../styles/MyTheme";
import DRAWER from "../components/ContentDRAWER ";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/Loading";
import ReactPlayer from "react-player";
import { BsCheck2Circle } from "react-icons/bs";
import { doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Check } from "@mui/icons-material";
import Celebration from "../Comp/loader/Celebrations";

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
  const [isCompleted, setIsCompleted] = useState(false);
  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const currCourse = JSON.parse(localStorage.getItem("currCourse"));
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [celeb, setCeleb] = useState(false);

  const GetCompletedLessons = async (params) => {
    const docRef = doc(db, "CoursesInProgress", user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap?.data()?.data?.find((course) => {
        return course.id === currCourse?.id;
      });
      const CompletedLessons = userData?.completedLessons;
      setCompletedLessons(CompletedLessons);
      setCurr(CompletedLessons?.length)
      console.log("curr" , curr)
    } else {
      console.log("No such document!");
    }
  };
  const CheckCompletedLesson = (id) => {
    return completedLessons.includes(id);
  };

  useEffect(() => {
    GetCompletedLessons();
    setTimeout(() => {
      setLoadingLessons(false);
    }, 1000);
  }, []);

  const updateProgress = (params) => {
    const UpdateCompletedinDB = async () => {
      const docRef = doc(db, "CoursesInProgress", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap
          ?.data()
          ?.data?.find((course) => course.id === currCourse?.id);
        const CompletedLessons = userData?.completedLessons;
        if (!completedLessons.includes(currCourse?.content[curr]?.id)) {
          handleUpdate();
          await updateDoc(docRef, {
            data: [
              ...docSnap
                .data()
                .data.filter((course) => course.id !== currCourse?.id),
              {
                ...userData,
                completedLessons: [
                  ...CompletedLessons,
                  currCourse?.content[curr]?.id,
                ],
              },
            ],
          });
          setCompletedLessons([
            ...CompletedLessons,
            currCourse?.content[curr]?.id,
          ]);
        }
        setCurr((prev) => (prev + 1) % currCourse?.content?.length);
      }
    };

    UpdateCompletedinDB();
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const handleUpdate = async () => {
    const docRef = doc(db, "Users", user?.uid);
    try {
      // Update points transactionally
      await runTransaction(db, async (transaction) => {
        const doc = await transaction.get(docRef);

        if (!doc.exists) {
          console.error("Document does not exist!");
          throw new Error("Document does not exist!");
        }

        const currentPoints = doc.data().points;

        // Update points with the new value
        transaction.update(docRef, { points: currentPoints + 20 });
      });

      // Update other state or perform additional operations
      // Simulate a promise-based operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Display a toast with the update status
      toast.success("Progress Updated");
    } catch (error) {
      // Handle any errors here
      console.error("Error during updating:", error);
      toast.error("Could not update. Try again later");
    }
  };

  React.useEffect(() => {
    setLoading(false);
  }, [loading]);
  const handleCeleb = async () => {
    const docRef = doc(db, "CoursesInProgress", user?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      console.log("NumOfCompleted", docSnap.data().NumOfCompleted);
      const completed = docSnap
        .data()
        .data.find((item) => (item.id === currCourse.id)).completed;
      if (completed) {
        return;
      }
      setCeleb(true);
      const userData = docSnap
        .data()
        .data.find((item) => (item.id === currCourse.id));
      await updateDoc(docRef, {
        NumOfCompleted: docSnap.data().NumOfCompleted + 1,
        data: [
          ...docSnap
            .data()
            .data.filter((course) => course.id !== currCourse?.id),
          {
            ...userData,
            completed: true,
          },
        ],
      });
      setTimeout(() => {
        setCeleb(false);
      }, 3000);
    }
  };


  useEffect(() => {
    console.log("completedLessons", completedLessons?.length);
    if (completedLessons?.length === currCourse?.chapters) {
      handleCeleb();
    }
  }, [completedLessons]);
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
          {celeb && <Celebration />}

          <DRAWER
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            props={props}
            theme={theme}
            mode={mode}
            setmyMode={setmyMode}
            setCurr={setCurr}
            curr={curr}
            CheckCompletedLesson={CheckCompletedLesson}
            loadingLessons={loadingLessons}
            compeletedLessons={completedLessons?.length}
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
                      disabled={
                        completedLessons?.length === currCourse?.content?.length
                      }
                      onClick={updateProgress}
                      className="bg-green-600 rounded-md p-1 px-2 text-white flex items-center gap-1 max-600:text-[13px] disabled:cursor-not-allowed disabled:opacity-[0.7]"
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
