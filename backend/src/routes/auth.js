const express = require("express");
const userRouter = express.Router();
const { userSignUp, loginUser, getAllUsers } = require("../Controller/UserController");
const verifyToken = require("../middleware/authMiddleware");

// Routes
userRouter.post("/signup", userSignUp);
userRouter.post("/login", loginUser);
userRouter.get("/all", verifyToken, getAllUsers); // protected route to get all users

module.exports = userRouter;
