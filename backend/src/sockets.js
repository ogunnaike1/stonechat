const { Server } = require("socket.io");

const messageServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 1️⃣ Add user
    socket.on("addUser", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("Online users:", [...onlineUsers.keys()]);
    });

    // 2️⃣ Send private message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("getMessage", {
          senderId,
          text,
          createdAt: new Date(),
        });
      }
    });

    // 3️⃣ Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
};

module.exports = messageServer