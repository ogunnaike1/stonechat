import React, { useRef, useState, type ChangeEvent } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

import ChatInput from "./ChatInput";
import Sidebar from "./Sidebar";

type Message = {
  text: string;
  sender: "me" | "other";
  time: string;
};

const MessageBubble = ({ msg }: { msg: Message }) => {
  if (msg.sender === "me") {
    // Sent (right)
    return (
      <div className="flex justify-end items-start gap-2">
        {/* Time */}
        <span className="text-xs text-gray-400 mt-1">{msg.time}</span>

        {/* Bubble */}
        <div className="bg-blue-500 text-white px-4 py-2 rounded-b-lg rounded-tl-lg shadow-md max-w-xs">
          <p>{msg.text}</p>
        </div>

        {/* Avatar */}
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg"
          alt="Me"
        />
      </div>
    );
  }

  // Received (left)
  return (
    <div className="flex items-start gap-2">
      {/* Avatar */}
      <img
        className="h-10 w-10 rounded-full object-cover"
        src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg"
        alt="Other"
      />

      {/* Bubble */}
      <div className="bg-white shadow-md px-4 py-2 rounded-b-lg rounded-tr-lg max-w-xs">
        <p className="text-gray-800">{msg.text}</p>
      </div>

      {/* Time */}
      <span className="text-xs text-gray-500 mt-1">{msg.time}</span>
    </div>
  );
};

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I help you today?",
      sender: "other",
      time: "10:30 AM",
    },
    {
      text: "I want to know more about your services.",
      sender: "me",
      time: "10:31 AM",
    },
  ]);
  const [openedSidebar, setOpenedSidebar] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset
      textarea.style.height = `${textarea.scrollHeight}px`; // expand
    }
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: message, sender: "me", time: new Date().toLocaleTimeString() },
    ]);

    setMessage(""); // clear
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div className="w-[70vw] relative lg:block hidden">
      {/* Header */}
      <div className="h-[15vh] w-full !bg-blue-500 flex justify-between items-center text-white">
        <button
          onClick={() => setOpenedSidebar(true)}
          className="ml-6 text-2xl"
        >
          <RxHamburgerMenu />
        </button>
        <div className="flex gap-5">
          <span className="px-8 border-r-2 border-blue-800">Homepage</span>
          <div className="flex gap-5 items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg"
              alt="Profile"
            />
            <span>usman ogunnaike</span>
            <span className="text-blue-950 px-4">
              <FaChevronRight />
            </span>
          </div>
        </div>
      </div>

      {/* Sub-header */}
      <div className="h-[13vh] bg-white">
        <div className="w-[85%] mx-auto flex justify-between items-center h-full">
          <div className="flex gap-5 items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg"
              alt="Chat avatar"
            />
            <span>usman ogunnaike</span>
          </div>
          <span className="text-xl">
            <BsThreeDotsVertical />
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div className="bg-[#EDF0F9] h-[72vh] pt-6 flex flex-col justify-between">
        <div className="flex-1 px-20 h-[55vh] overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <MessageBubble key={index} msg={msg} />
          ))}
        </div>

        {/* Input */}
        <ChatInput
          message={message}
          textareaRef={textareaRef}
          handleInput={handleInput}
          onSend={handleSend}
        />
      </div>

      {/* Sidebar */}
      {openedSidebar && <Sidebar onClose={() => setOpenedSidebar(false)} />}
    </div>
  );
};

export default ChatRoom;
