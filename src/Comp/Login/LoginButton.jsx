import React from "react";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const LoginButton = (props) => {
  return (
    <div>
      <Button
        onClick={props.handleOpen}
        variant="outlined"
        className="gap-1 !text-white !border-white  hover:!border-blue-50 hover:!bg-blue-300 !transition-all !duration-500"
      >
        <LoginIcon /> Login
      </Button>
    </div>
  );
};

export default LoginButton;
