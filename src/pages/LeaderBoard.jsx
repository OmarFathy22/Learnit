
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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loading from "../Comp/loader/LoadUsers";


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
        const querySnapshot = await getDocs(collectionRef);
    
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
        console.log("Documents: ", documents);
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
            <div  className={`m-2 px-2 py-1 rounded-md flex justify-between items-center sm:pr-[50px] pr-[100px] bg-[#dcd9d9]`} >
                    <div className="flex gap-2 ml-[10px]">
                      user
                    </div>
                    <div className="mr-[110px]  border text-green-700">
                      points
                    </div>
                  </div>
              {loading ? <Loading/>:Users.map((user , index) => {
                return(
                  <div key={index} className={`mx-2 px-2 py-1 rounded-md flex justify-between items-center ${index %2 == 0 && "bg-[#dcd9d9]"}`} >
                    <div className="flex gap-2">
                      <div><img className="w-10 h-10 rounded-full" src={user?.photoUrl} alt="" /></div>
                      <div>
                        <div>{user?.username}</div>
                        <div>level {Math.floor((user?.points) / 100) + 1}</div>
                      </div>
                    </div>
                    <h6 className="bg-[#7ee97eac] w-[100px] text-center text-[#266e26]  py-[1px] rounded-full sm:mr-[30px] mr-[80px]">
                      {user?.points}
                    </h6>
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
