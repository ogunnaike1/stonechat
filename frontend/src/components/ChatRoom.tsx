import React, { useRef, useState, useEffect, type ChangeEvent } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ChatInput from "./ChatInput";
import Sidebar from "./Sidebar";
import LogoutModal from "./LogoutModal";
import { logout } from "../utils/auth";
import { socket } from "../socket";
import api from "../api/axios";
import { formatTime } from "../utils/formatTime";

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

const MessageBubble = ({ msg, otherAvatar, myAvatar }: MessageBubbleProps) => {
  const isMe = msg.sender === "me";

  return (
    <div
      className={`flex items-start gap-2 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMe && <img src={otherAvatar} className="h-8 w-8 rounded-full" alt="sender avatar" />}
      {!isMe && (
        <>
          <div className="px-4 py-2 rounded-lg max-w-xs bg-white text-gray-800 rounded-bl-none">
            {msg.text}
          </div>
          <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
        </>
      )}

      {isMe && (
        <>
          <span className="text-[10px] text-gray-400 mt-1">{msg.time}</span>
          <div className="px-4 py-2 rounded-lg max-w-xs bg-blue-500 text-white rounded-br-none">
            {msg.text}
          </div>
          <img src={myAvatar} className="h-8 w-8 rounded-full" alt="my avatar" />
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
  loggedInUser: string;
  myAvatar: string;
};

const ChatRoom = ({
  activeChat,
  conversations,
  setConversations,
  loggedInUser,
  myAvatar,
}: ChatRoomProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [openedSidebar, setOpenedSidebar] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const currentChat = conversations.find(c => c.name === activeChat?.name);

  /* ---------- RECEIVE MESSAGE ---------- */
  useEffect(() => {
    const handleMessage = (msg: any) => {
      setConversations(prev =>
        prev.map(conv =>
          conv.name === msg.from
            ? {
                ...conv,
                lastMessage: msg.text,
                time: formatTime(msg.time),
                messages: [
                  ...conv.messages,
                  { text: msg.text, sender: "other", time: formatTime(msg.time) },
                ],
              }
            : conv
        )
      );
    };
  
    socket.on("receive_message", handleMessage);
  
    // Cleanup function to remove the listener
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [setConversations]);
  

  /* ---------- FETCH MESSAGES ---------- */
  useEffect(() => {
    if (!currentChat) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/messages/${loggedInUser}/${currentChat.name}`);
        const messages: Message[] = res.data.map((msg: any) => ({
          text: msg.text,
          sender: msg.from === loggedInUser ? "me" : "other",
          time: formatTime(msg.time),
        }));

        setConversations(prev =>
          prev.map(conv =>
            conv.name === currentChat.name ? { ...conv, messages } : conv
          )
        );
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [currentChat, loggedInUser, setConversations]);

  /* ---------- AUTO SCROLL ---------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

  const handleSend = () => {
    if (!message.trim() || !currentChat) return;

    const time = formatTime();

    // Optimistic update
    setConversations(prev =>
      prev.map(conv =>
        conv.name === currentChat.name
          ? {
              ...conv,
              lastMessage: message,
              time,
              messages: [...conv.messages, { text: message, sender: "me", time }],
            }
          : conv
      )
    );

    socket.emit("send_message", {
      from: loggedInUser,
      to: currentChat.name,
      text: message,
      time,
    });

    setMessage("");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
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
        <span className="text-2xl cursor-pointer" onClick={() => setOpenedSidebar(true)}>
          <RxHamburgerMenu />
        </span>

        <div className="flex items-center gap-3">
          <img src={currentChat.avatar} className="h-10 w-10 rounded-full" alt={currentChat.name} />
          <span>{currentChat.name}</span>
          <FaChevronRight />
        </div>
      </div>

      {/* MESSAGES */}
      <div className="bg-[#EDF0F9] h-[72vh] flex flex-col justify-between">
        <div className="flex-1 px-10 py-6 overflow-y-auto space-y-4">
          {currentChat.messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} otherAvatar={currentChat.avatar} myAvatar={myAvatar} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          message={message}
          textareaRef={textareaRef}
          handleInput={handleInput}
          onSend={handleSend}
        />
      </div>

      {/* SIDEBAR */}
      {openedSidebar && <Sidebar onClose={() => setOpenedSidebar(false)} />}

      {/* LOGOUT MODAL */}
      {showLogout && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />}
    </div>
  );
};

export default ChatRoom;
