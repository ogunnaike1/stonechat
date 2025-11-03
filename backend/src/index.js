const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connect = require("./Dbconfig/dbconfig.js")
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const userRouter = require("./routes/auth")

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use("/user", userRouter)


app.get("/", (req, res) => res.send("Chat backend running"));

const PORT = process.env.PORT || 4000;
connect()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
