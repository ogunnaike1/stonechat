import { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import ChatRoom, { type Conversation } from "../components/ChatRoom";
import { socket } from "../socket";
import api from "../api/axios";

const ChatHome = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedInUser = user.username || "";
  const myAvatar = user.avatar || "https://randomuser.me/api/portraits/men/75.jpg";

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);

  // Register user on socket
  useEffect(() => {
    if (!loggedInUser) return;

    socket.emit("register_user", { username: loggedInUser, avatar: myAvatar });
    return () => {
      socket.disconnect();
    };
  }, [loggedInUser, myAvatar]);

  // Load all users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/user/all");
        const users: Conversation[] = res.data
          .filter((u: any) => u.username !== loggedInUser)
          .map((u: any) => ({
            name: u.username,
            avatar: u.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
            lastMessage: "",
            time: "",
            messages: [],
          }));
        setConversations(users);
      } catch (err) {
        console.error(err);
      }
    };
    loadUsers();
  }, [loggedInUser]);

  // Handle chat selection
  const handleSelectChat = async (chat: Conversation) => {
    try {
      const res = await api.get(`/api/messages/${loggedInUser}/${chat.name}`);
      const messages = res.data.map((msg: any) => ({
        text: msg.text,
        sender: msg.from === loggedInUser ? "me" : "other",
        time: msg.time,
      }));

      setConversations((prev) =>
        prev.map((conv) =>
          conv.name === chat.name
            ? {
                ...conv,
                messages,
                lastMessage: messages[messages.length - 1]?.text || "",
                time: messages[messages.length - 1]?.time || "",
              }
            : conv
        )
      );

      setActiveChat(chat);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <ChatRoom
        activeChat={activeChat}
        conversations={conversations}
        setConversations={setConversations}
        loggedInUser={loggedInUser}
        myAvatar={myAvatar}
      />
      <MessageList conversations={conversations} setActiveChat={handleSelectChat} />
    </div>
  );
};

export default ChatHome;
