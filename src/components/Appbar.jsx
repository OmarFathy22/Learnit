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

export default function PrimarySearchAppBar({
  showList,
  setshowList,
  handleDrawerToggle,
  theme,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <Box>
      <AppBar
        position="fixed"
        className="bg-[#4dbbe0]"
        sx={{
          width: { md: `calc(100% - 300px)` },
          // ml: { sm: `240px` },
          // backgroundImage:
          //   "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          // backgroundColor: "#4dbbe0",
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
            className={`sm:hidden ${pathname.includes("courses") && "hidden"}`}
          >
            <SearchBar theme={theme} />
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
              {Object.keys(user)?.length ? (
                <AvatarPage user={user} />
              ) : (
                <div>
                  {pathname.includes("courses") && (
                    // <LoginButton text={"Exit"} handleOpen={handleOpen} />
                    <></>
                  )}
                  <LoginButton handleOpen={handleOpen} />
                  <LoginModal open={open} handleClose={handleClose} />
                </div>
              )}
            </div>
          </Box>
        </Toolbar>
        <Divider />
        <div className="min-600:hidden">
          <SearchBar theme={theme} />
        </div>
      </AppBar>
    </Box>
  );
}
