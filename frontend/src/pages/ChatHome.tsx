import { useState } from "react";
import MessageList from "../components/MessageList";
import ChatRoom, { type Conversation } from "../components/ChatRoom";

const ChatHome = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      name: "Usman Ogunnaike",
      avatar:
        "https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg",
      lastMessage: "Hey pretty girl hey pretty girl",
      time: "8:08 pm",
      messages: [],
    },
    {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "How far?",
      time: "7:45 pm",
      messages: [],
    },
    {
      name: "Mary Jane",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "See you tomorrow",
      time: "6:30 pm",
      messages: [],
    },
  ]);

  const [activeChat, setActiveChat] = useState<Conversation | null>(null);

  // ✅ Seed lastMessage into messages on first open
  const handleSelectChat = (chat: Conversation) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.name === chat.name && conv.messages.length === 0
          ? {
              ...conv,
              messages: [
                {
                  text: conv.lastMessage,
                  sender: "other",
                  time: conv.time,
                },
              ],
            }
          : conv
      )
    );

    setActiveChat(chat);
  };

  return (
    <div className="flex h-screen">
      <ChatRoom
        activeChat={activeChat}
        conversations={conversations}
        setConversations={setConversations}
      />

      <MessageList
        conversations={conversations}
        setActiveChat={handleSelectChat}
      />
    </div>
  );
};

export default ChatHome;
