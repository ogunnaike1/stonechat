import { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import ChatRoom, { type Conversation, type Message } from "../components/ChatRoom";
import { socket } from "../socket";
import api from "../api/axios";

type SocketMessage = {
  from: string;
  to: string;
  text: string;
  time: string;
};

const ChatHome = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedInUser = user.username || "";
  const myAvatar =
    user.avatar || "https://randomuser.me/api/portraits/men/75.jpg";

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);

  /* ---------------- SORT HELPER ---------------- */
  const sortConversations = (convs: Conversation[]) =>
    [...convs].sort((a, b) => {
      if (!a.time) return 1;
      if (!b.time) return -1;
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });

  /* ---------------- REGISTER USER ---------------- */
  useEffect(() => {
    if (!loggedInUser) return;

    socket.emit("register_user", {
      username: loggedInUser,
      avatar: myAvatar,
    });
  }, [loggedInUser, myAvatar]);

  /* ---------------- LOAD USERS ---------------- */
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/user/all");

        const users: Conversation[] = res.data
          .filter((u: any) => u.username !== loggedInUser)
          .map((u: any) => ({
            name: u.username,
            avatar:
              u.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
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

  /* ---------------- SOCKET LISTENER ---------------- */
  useEffect(() => {
    const handleReceiveMessage = (msg: SocketMessage) => {
      const incomingMessage: Message = {
        text: msg.text,
        sender: "other",
        time: msg.time,
      };

      setConversations(prev => {
        const updated = prev.map(conv =>
          conv.name === msg.from
            ? {
                ...conv,
                lastMessage: msg.text,
                time: msg.time,
                messages: [...conv.messages, incomingMessage],
              }
            : conv
        );

        return sortConversations(updated);
      });

      // 🔥 sync active chat in real-time
      setActiveChat(prev =>
        prev && prev.name === msg.from
          ? {
              ...prev,
              lastMessage: msg.text,
              time: msg.time,
              messages: [...prev.messages, incomingMessage],
            }
          : prev
      );
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  /* ---------------- SELECT CHAT ---------------- */
  const handleSelectChat = async (chat: Conversation) => {
    try {
      const res = await api.get(
        `/api/messages/${loggedInUser}/${chat.name}`
      );

      const messages: Message[] = res.data.map((msg: {
        text: string;
        from: string;
        time: string;
      }) => ({
        text: msg.text,
        sender: msg.from === loggedInUser ? "me" : "other",
        time: msg.time,
      }));

      setConversations(prev => {
        const updated = prev.map(conv =>
          conv.name === chat.name
            ? {
                ...conv,
                messages,
                lastMessage: messages.at(-1)?.text || "",
                time: messages.at(-1)?.time || "",
              }
            : conv
        );

        return sortConversations(updated);
      });

      setActiveChat({
        ...chat,
        messages,
        lastMessage: messages.at(-1)?.text || "",
        time: messages.at(-1)?.time || "",
      });
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

      <MessageList
        conversations={conversations}
        setActiveChat={handleSelectChat}
      />
    </div>
  );
};

export default ChatHome;
