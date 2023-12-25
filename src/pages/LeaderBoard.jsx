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
import DRAWER from "../components/DRAWER";
import { data3 } from "../../Data";
import { collection, getDocs ,query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loading from "../Comp/loader/LoadUsers";
import no_avatar from "../assets/no_avatar.png";

const Root = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [showList, setshowList] = useState("none");
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );
  useEffect(() => {
    const getAllDocuments = async (collectionName) => {
      setLoading(true);
      try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(query(collectionRef, orderBy('points', 'desc')));
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        return documents;
      } catch (error) {
        console.error("Error getting documents: ", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    // Example usage
    const collectionName = "Users";
    getAllDocuments(collectionName)
      .then((documents) => {
        setUsers(documents);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);
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
          <div className="border-[1px] max-600:mt-[120px] border-gray-200 my-[100px] pb-2 w-full mx-7 rounded-md h-[80vh] overflow-auto ">
            <div>
              <div
                className={`m-2 px-2 py-1 rounded-md flex  justify-between items-center sm:pr-[50px] pr-[100px] bg-[#294793]`}
              >
                <div className="flex text-white gap-2 font-bold">#rank</div>
                <div className="flex text-white gap-2 mr-[50px] font-bold">user</div>
                <div className=" text-white mr-[30px] font-bold">
                  points
                </div>
              </div>
              {loading ? (
                <Loading />
              ) : (
                Users?.map((user, index) => {
                  const hasPhoto = user?.photoUrl;
                  const imageUrl = hasPhoto ? user?.photoUrl : no_avatar;

                  return (
                    <div
                      key={index}
                      className={`mx-2  px-2 py-1 rounded-md flex justify-between items-center mb-2 bg-[#294793] `}
                    >
                        <h5 className="max-600:text-[15px] w-[50px] text-center bg-[#3f6ee6a9] rounded-md p-2 text-white">#{index + 1}</h5>
                      <div className="flex  min-600:w-[300px] max-600:w-full max-600:px-3 gap-2 items-center min-w-[200px] max-600:min-w-[140px]">
                        <div>
                          <img
                            className="w-10 h-10 max-600:w-7 max-600:h-7 rounded-full"
                            src={imageUrl}
                            alt=""
                          />
                        </div>
                        <div>
                          <div className="text-white max-600:text-[12px] ">{user?.username}</div>
                          <div className="text-white max-600:text-[12px] ">
                            level {Math.floor(user?.points / 100) + 1}
                          </div>
                        </div>
                      </div>
                      <h6 className="bg-[#7ee97eac] w-[100px] text-center py-[1px] rounded-full  text-white">
                        {user?.points}
                      </h6>
                    </div>
                  );
                })
              )}
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
