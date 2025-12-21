import React, { useRef, useState, type ChangeEvent } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa6";
import ChatInput from "./ChatInput";
import Sidebar from "./Sidebar";

/* ---------- TYPES ---------- */

export type Message = {
  text: string;
  sender: "me" | "other";
  time: string;
};

export type Conversation = {
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  messages: Message[];
};

/* ---------- MESSAGE BUBBLE ---------- */

type MessageBubbleProps = {
  msg: Message;
  otherAvatar: string;
  myAvatar: string;
};

const MessageBubble = ({
  msg,
  otherAvatar,
  myAvatar,
}: MessageBubbleProps) => {
  const isMe = msg.sender === "me";

  return (
    <div
      className={`flex items-start gap-2 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {/* OTHER USER AVATAR (LEFT) */}
      {!isMe && (
        <img
          src={otherAvatar}
          className="h-8 w-8 rounded-full"
          alt="sender avatar"
        />
      )}
  
      {/* OTHER USER: BUBBLE THEN TIME */}
      {!isMe && (
        <>
          <div
            className="px-4 py-2 rounded-lg max-w-xs bg-white text-gray-800 rounded-bl-none"
          >
            {msg.text}
          </div>
          <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
        </>
      )}
  
      {/* MY BUBBLE */}
      {isMe && (
        <>
          {/* TIME BEFORE BUBBLE */}
          <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
          <div
            className="px-4 py-2 rounded-lg max-w-xs bg-blue-500 text-white rounded-br-none"
          >
            {msg.text}
          </div>
          {/* MY AVATAR (RIGHT) */}
          <img
            src={myAvatar}
            className="h-8 w-8 rounded-full"
            alt="my avatar"
          />
        </>
      )}
    </div>
  );
  
};

/* ---------- CHAT ROOM ---------- */

type ChatRoomProps = {
  activeChat: Conversation | null;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
};

const ChatRoom = ({
  activeChat,
  conversations,
  setConversations,
}: ChatRoomProps) => {
  const [message, setMessage] = useState("");
  const [openedSidebar, setOpenedSidebar] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // ✅ SINGLE SOURCE OF TRUTH
  const currentChat = conversations.find(
    (c) => c.name === activeChat?.name
  );

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (!message.trim() || !currentChat) return;

    const myMessage: Message = {
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString(),
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.name === currentChat.name
          ? {
              ...conv,
              lastMessage: myMessage.text,
              time: myMessage.time,
              messages: [...conv.messages, myMessage],
            }
          : conv
      )
    );

    setMessage("");

    // Simulated reply (LEFT)
    setTimeout(() => {
      const reply: Message = {
        text: "Reply received 👍",
        sender: "other",
        time: new Date().toLocaleTimeString(),
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.name === currentChat.name
            ? {
                ...conv,
                lastMessage: reply.text,
                time: reply.time,
                messages: [...conv.messages, reply],
              }
            : conv
        )
      );
    }, 1000);
  };

  if (!currentChat) {
    return (
      <div className="w-[70vw] hidden lg:flex items-center justify-center text-gray-400">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="w-[70vw] hidden lg:block">
      {/* HEADER */}
      <div className="h-[16vh] bg-blue-500 flex items-center justify-between px-6 text-white">
        <RxHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => setOpenedSidebar(true)}
        />

        <div className="flex items-center gap-3">
          <img
            src={currentChat.avatar}
            className="h-10 w-10 rounded-full"
            alt={currentChat.name}
          />
          <span>{currentChat.name}</span>
          <FaChevronRight />
        </div>
      </div>

      {/* MESSAGES */}
      <div className="bg-[#EDF0F9] h-[72vh] flex flex-col justify-between">
        <div className="flex-1 px-10 py-6 overflow-y-auto space-y-4">
          {currentChat.messages.map((msg, i) => (
            <MessageBubble
              key={i}
              msg={msg}
              otherAvatar={currentChat.avatar}
              myAvatar="https://randomuser.me/api/portraits/men/75.jpg"
            />
          ))}
        </div>

        <ChatInput
          message={message}
          textareaRef={textareaRef}
          handleInput={handleInput}
          onSend={handleSend}
        />
      </div>

      {openedSidebar && <Sidebar onClose={() => setOpenedSidebar(false)} />}
    </div>
  );
};

export default ChatRoom;
