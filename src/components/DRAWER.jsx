/* eslint-disable react/prop-types */
import { useState } from "react";
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
import Logo from "../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
// import Create from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, styled, Switch } from "@mui/material";
import { useNavigate } from "react-router";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import YouSure from "./YouSure";
import Modal from "../Comp/Instructor/Modal"
import LoginModal from "../Comp/Login/LoginModal";
import InstructorForm from "../Comp/Instructor/Form";

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

function ResponsiveDrawer({
  props,
  theme,
  setmyMode,
  handleDrawerToggle,
  mobileOpen,
}) {
  const [openYouSureForLogout, setopenYouSureForLogout] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseLoginModal = () => setOpenModal(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  // const location = useLocation();
  const { Window } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const list = [
    { text: "/", icon: <HomeIcon /> },
    { text: "DashBoard", icon: <PersonIcon /> },
    // { text: "Create", icon: <Create /> },
    { text: "LeaderBoard", icon: <BookmarksIcon /> },
    { text: "Become an instructor", icon: <PersonIcon /> },
  ];
  const drawer = (
    <div>
      <Toolbar className="">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // height: "64px",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <img
          
            src={
              "/logo.jpg"
            }
            alt="O"
            width={"50px"}
            height={"100px"}
            style={{ borderRadius: "50%" }}
          />
          <h1
            className=" font-bold ml-2 text-[25px] mt-3"
            // style={{ wordSpacing: -7 }}
          >
            SKILLS HUB
          </h1>
        </Box>
      </Toolbar>
      <List > 
        <Modal open={open} handleClose={handleClose} />
        <LoginModal open={openModal} handleClose={handleCloseLoginModal} />
        {list.map((item, index) => {
          return (
            <label
              htmlFor={item.text === "Create" ? "FabIconClick" : ""}
              key={index}
              className="w-full"
            >
              <ListItemButton
                onClick={() => {
                  // handleDrawerToggle();
                  if (item.text === "DashBoard") {
                     if(user){
                      navigate("/dashboard");
                     }
                     else{
                      setOpenModal(true);
                     }
                  } else if (item.text === "/") {
                    navigate("/");
                  } else if (item.text === "Logout") {
                    setopenYouSureForLogout(true);
                  } else if (item.text === "LeaderBoard") {
                    navigate("/leaderboard");
                  } else if (item.text === "Become an instructor") {
                    // handleOpen();
                    navigate("/instructor");

                  }
                }}
                key={index}
          
                sx={{
                  padding: "2px",
                  backgroundColor:
                    location.pathname == item.text ||
                    location.pathname.startsWith(
                      `/${item.text.toLocaleLowerCase()}`
                    )
                      ? "rgb(98 94 94 / 30%)"
                      : "",
                  margin: "10px 0",
                  width: "100%",
                }}
              >
                <ListItem>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text === "/" ? "Home" : item.text}
                  />
                </ListItem>
              </ListItemButton>
            </label>
          );
        })}
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
      </List>
      <YouSure
        dofunction={() => {
          localStorage.setItem("CurrUser", JSON.stringify({}));
          localStorage.setItem("SignedIn", "false");
          window.location.reload();
        }}
        open={openYouSureForLogout}
        setOpen={setopenYouSureForLogout}
        text={"Are You sure you want to logout?"}
      />
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
          // className={theme.palette.mode === "light" ? " rgb(247, 247, 247)" : "bg-blue-300"}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            //   backgroundColor:
                
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
