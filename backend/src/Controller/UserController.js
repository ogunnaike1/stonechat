const mongoose = require("mongoose")
const userModel = require("../models/UserModel")


const userSignUp = async(req, res)=>{
    console.log(req.body)

    try {
        const { username, email, password} = req.body
        console.log(username)
        
    } catch (error) {
        console.log(error)
        
    }

}

module.exports = {userSignUp}