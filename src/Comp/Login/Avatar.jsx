import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import PointsLoader from "../loader/LoadPoints";
import Logout from "@mui/icons-material/Logout";
import UserProgress from "./UserProgress";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";
import { reload } from "firebase/auth";
import { useLocation } from "react-router-dom";

export default function AccountMenu({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userData, setUserData] = React.useState({ points: 0, level: 0 });
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    const docRef = doc(db, "Users", user?.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData({
          points: docSnap.data().points,
          level: docSnap.data().level,
        });
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    });

    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  }, []);

  const { photoUrl, username, email } = user;
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={photoUrl || '/no_avatar'}>
              {photoUrl}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{alignItems:"center"}} onClick={handleClose}>
          <Box>
            <img src={photoUrl} className="w-[40px] h-[40px] mr-2 rounded-full" />
          </Box>
          <Box>
            <h6 className="font-bold">{username}</h6>
            <h6 className="font-bold">{email}</h6>
          </Box>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
           My account
        </MenuItem> */}
        <MenuItem onClick={handleClose}>
          {loading ? (
            <PointsLoader />
          ) : (
            <div>
              <div className="flex justify-between min-w-[350px] text-[13px] mb-1 text-gray-500 ">
                <h6>level {Math.floor(userData.points / 100) + 1} </h6>
                <h6>{userData.points % 100}/100 points</h6>
              </div>
              <UserProgress value={userData.points % 100} />
            </div>
          )}
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={() => {
            localStorage.removeItem("user");
            handleClose();
            if(pathname !== "/"){
              navigate("/");
            }
            setTimeout(() => {
              window.location.reload();
            }, 200);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
