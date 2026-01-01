const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const http = require("http");
const connectDB = require("./Dbconfig/dbconfig");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/user", require("./routes/auth")); // <-- updated
app.use("/api/messages", require("./routes/MessagesRoute"));

// Root route
app.get("/", (req, res) => res.send("Chat backend running"));

// Socket.io
require("./sockets")(server);

// Connect DB
connectDB();

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
