// ChatbotButton.js
import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "../Chatbot/chatbotconfig";
import MessageParser from "../Chatbot/MessageParser";
import ActionProvider from "../Chatbot/ActionProvider";
import "react-chatbot-kit/build/main.css";
import { IoMdCloseCircle } from "react-icons/io";
import { FaRobot } from "react-icons/fa";

const ChatbotButton = () => {
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  return (
    <>
      <div
        className=" fixed bottom-[70px] right-[70px] bg-blue-400 p-4 rounded-full cursor-pointer transition duration-300 hover:bg-blue-300"
        onClick={toggleChatbot}
      >
          <FaRobot className="text-[30px]"/>
      </div>

      {chatbotVisible && (
        <div className="fixed max-w-[350px] bottom-[0] right-[0] bg-white  border-gray-300 p-4 rounded-md shadow-lg border-[1px]">
          <button onClick={() => {
            setChatbotVisible(false)
          }} className="absolute left-1 top-1 cursor-pointer"><IoMdCloseCircle className="text-blue-500 text-[20px]"/></button>
          <Chatbot
        
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            headerText='SKILLS HUB Chatbot'
          />
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
