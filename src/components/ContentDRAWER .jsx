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
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Divider, styled, Switch } from "@mui/material";
import { useNavigate } from "react-router";

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

function ResponsiveDrawer({
  props,
  theme,
  setmyMode,
  handleDrawerToggle,
  mobileOpen,
  setCurr,
  curr,
}) {
  const [openYouSureForLogout, setopenYouSureForLogout] = useState(false);
  const handleCurr = (index) => {
    setCurr(index)
  }
  const navigate = useNavigate();
  // const location = useLocation();
  const { Window } = props;
  const drawer = (
    <div>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            flexDirection: "column",
            gap:1,
            padding:3
          }}
        >
          <h1 className="font-bold">Fullstack Notion Clone</h1>
          <div className="flex flex-col gap-[2px]">
            <UserProgress value={5} />
            <h1 className="text-green-700">5% Complete</h1>
          </div>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{paddingTop:0}}>
        {Array(20)
          .fill()
          .map((item, index) => {
            return (
              <label htmlFor={"FabIconClick"} key={index}>
                <ListItemButton
                  onClick={() => {
                    handleCurr(index)
                  }}
                    
                  
                  key={index}
                  sx={{
                    // padding: "2px",
                    backgroundColor: curr === index ?"rgb(99 95 95 / 10%)" :"rgb(98 94 94 / 30%)",
                    // margin: "20px 0",
                    width: "100%",
                  }}
                >
                  <ListItem>
                    <ListItemIcon>
                      <PlayCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Episode" + ` ${index + 1}`} />
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
