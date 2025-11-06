const express = require("express")
const userRouter = express.Router()

const {userSignUp, loginUser } = require("../Controller/UserController")

userRouter.post("/signup", userSignUp)
userRouter.post("/login", loginUser)

module.exports = userRouter