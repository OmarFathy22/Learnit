import React, { useEffect, useState } from "react";
import OpenAI from "openai";
import "./style.css";
import { IoIosSend } from "react-icons/io";
import Loader from "../Comp/loader/LoadMessage";

// Replace 'your-api-key' with your actual OpenAI API key
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput) return;

    // Update chat history with user input
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "user", content: userInput },
    ]);
    setUserInput("");
    setLoading(true);
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "assistant", content: userInput },
    ]);

    // Get ChatGPT response using the latest chat history
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        ...chatHistory, // Use the latest chat history
        { role: "user", content: userInput }, // Include the current user message
      ],
      model: "gpt-3.5-turbo",
    });

    // Update chat history with ChatGPT response
    setChatHistory((prevChatHistory) => prevChatHistory.slice(0, -1));
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "assistant", content: completion.choices[0].message.content },
    ]);
    setLoading(false);
  };

  return (
    <div className="bg-gray-500  w-[300px] relative overflow-auto rounded-md">
      <h5 className="text-center text-white bg-blue-400 py-2 rounded-t-md">
        Skills-hub assistant
      </h5>
      <div className="p-3 flex flex-col  h-[300px] mb-[40px] overflow-auto">
        <div
          className={` !ml-[8px] mb-2 slef-start px-2 py-1 w-fit max-w-[85%] rounded-md chat left`}
        >
          {"hi there"}
        </div>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`${
              message?.role === "user"
                ? "!mr-[8px] self-end mb-2 chat right w-fit max-w-[85%] px-2 py-1 rounded-md"
                : " !ml-[8px] mb-2 slef-start px-2 py-1 w-fit max-w-[85%] rounded-md chat left"
            }`}
          >
            {message?.role === "assistant" &&
            loading &&
            index === chatHistory.length - 1 ? (
              <Loader />
            ) : (
              message?.content
            )}
          </div>
        ))}
      </div>
      <form className="absolute bottom-0 left-0 right-0 w-full flex">
        <input
          placeholder="write your message here..."
          type="text"
          className="pl-3 text-black outline-none flex-1 h-[40px]"
          value={userInput}
          onChange={handleUserInput}
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="px-3 bg-blue-400"
        >
          <IoIosSend className="text-2xl text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
