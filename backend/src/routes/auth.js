const express = require("express")
const userRouter = express.Router()

const {userSignUp} = require("../Controller/UserController")

userRouter.post("/signup", userSignUp)

module.exports = userRouter