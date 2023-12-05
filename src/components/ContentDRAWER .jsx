import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Divider, styled, Switch } from "@mui/material";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Loading from "../Comp/loader/LoadPoints";
import { useEffect, useState } from "react";
import Celebration from "../Comp/loader/Celebrations";

import UserProgress from "../Comp/Login/UserProgress";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(24px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },

      "& + .MuiSwitch-track": {
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
const drawerWidth = 300;

const ToggleModeComponent = ({ mode, setmyMode, theme }) => {
  return (
    <div className=" absolute ">
      <MaterialUISwitch
        onClick={() => {
          localStorage.setItem(
            "currentMode",
            theme.palette.mode === "dark" ? "light" : "dark"
          );
          setmyMode(theme.palette.mode === "light" ? "dark" : "light");
        }}
        sx={{ m: 1 }}
        checked={theme.palette.mode === "dark" ? true : false}
      />
      {theme.palette.mode === "dark" ? "Dark" : "Light"}
    </div>
  );
};

function ResponsiveDrawer({
  props,
  theme,
  setmyMode,
  handleDrawerToggle,
  mobileOpen,
  setCurr,
  curr,
  CheckCompletedLesson,
  loadingLessons,
  compeletedLessons,
}) {
  const handleCurr = (index) => {
    setCurr(index);
  };
  const { Window } = props;
  const darkMode =
    localStorage.getItem("currentMode") === "dark" ? true : false;
  const user = JSON.parse(localStorage.getItem("user"));
  const currCourse = JSON.parse(localStorage.getItem("currCourse"));

  const drawer = (
    <div>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            flexDirection: "column",
            gap: 1,
            padding: 3,
          }}
        >
          <h6 className="font-bold">Fullstack Notion Clone</h6>
          <div className="flex flex-col gap-[2px]">
            <UserProgress value={(compeletedLessons / currCourse?.content?.length)*100 } />
            <h6 className="text-green-700">{Math.floor((compeletedLessons / currCourse?.content?.length)*100)}% Complete</h6>
          </div>
        </Box>
      </Toolbar>
      <Divider />
      {loadingLessons ? (
        <Loading />
      ) : (
        <List sx={{ paddingTop: 0 }}>
          {currCourse?.content.map((item, index) => {
            return (
              <label htmlFor={"FabIconClick"} key={index} className="w-full">
                <ListItemButton
                  onClick={() => {
                    handleCurr(index);
                  }}
                  key={index}
                  sx={{
                    // padding: "2px",
                    gap: 1,
                    backgroundColor:
                      curr === index
                        ? "rgb(99 95 95 / 40%)"
                        : darkMode
                        ? "#121212"
                        : "rgb(247, 247, 247)",
                    // margin: "20px 0",
                    width: "100%",
                  }}
                >
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      {CheckCompletedLesson(item.id) ? (
                        <IoMdCheckmarkCircleOutline
                          className={`${
                            CheckCompletedLesson(item.id) && "text-green-500"
                          }`}
                        />
                      ) : (
                        <MdOutlineOndemandVideo />
                      )}
                    </ListItemIcon>
                    <ListItemText>
                      <span
                        className={`mr-2 ${
                          CheckCompletedLesson(item.id) && "text-green-600"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`text-[12px]  inline-block -translate-y-[2px] ${
                          CheckCompletedLesson(item.id)
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                      >
                        [{item.duration}min]
                      </span>
                    </ListItemText>
                  </ListItem>
                </ListItemButton>
              </label>
            );
          })}
        </List>
        
      )}
    </div>
  );

  const container =
    Window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor:
                theme.palette.mode === "light" ? " rgb(247, 247, 247)" : null,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor:
                theme.palette.mode === "light" ? " rgb(247, 247, 247)" : null,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  Window: PropTypes.func,
};

export default ResponsiveDrawer;
