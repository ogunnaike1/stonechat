const { Server } = require("socket.io");
const User = require("../models/UserModel");
const Message = require("../models/MessagesModel");

module.exports = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    // Register user
    socket.on("register_user", async ({ username, avatar }) => {
      if (!username) return;
      await User.findOneAndUpdate({ username }, { socketId: socket.id, avatar }, { new: true });
      console.log(`${username} registered with socket ${socket.id}`);
    });

    // Send message
    socket.on("send_message", async ({ from, to, text, time }) => {
      if (!from || !to || !text) return;

      // Save message in DB
      const message = await Message.create({ from, to, text, time });

      // Emit to receiver if online
      const receiver = await User.findOne({ username: to });
      if (receiver?.socketId) {
        io.to(receiver.socketId).emit("receive_message", {
          from,
          text,
          time,
        });
      }
    });

    socket.on("disconnect", async () => {
      await User.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
      console.log("Disconnected:", socket.id);
    });
  });
};
