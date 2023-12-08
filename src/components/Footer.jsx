import React from "react";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="min-900:ml-[300px] border-t-[1px] flex max-600:flex-col-reverse items-center justify-between px-3 py-4">
      <div className="flex items-center text-[13px]">
        ©  2023 SKILLS HUB. All rights reserved.
    </div>
    <div className="flex gap-3 items-center">
      <a href="mailto:abc@example.com" className="text-[13px] text-gray-500"> Support</a>
      <a href="https://www.termsfeed.com/live/8be560f6-4487-4829-9dfd-ff4a94589225" className="text-[13px] text-gray-500"> Terms of Service</a>
      <a href="https://www.termsfeed.com/live/87149a5a-6182-4acd-8a65-24d2a02ad3d1" className="text-[13px] text-gray-500"> privacy policy</a>
        
    </div>
    </div>
  );
};

export default Footer;
