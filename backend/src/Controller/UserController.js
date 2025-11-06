const mongoose = require("mongoose")
const userModel = require("../models/UserModel")


const userSignUp = async(req, res)=>{
    console.log(req.body)
    try {
        const { username, email, password} = req.body
        console.log(username)

        if(!username || !email || !password){
            return console.log("missing detail")
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: "Email already exists" });

        } else{
            const user = await  userModel.create({
                username,
                email,
                password,
            })

       
            if(user){
                const userData = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                  };
    
                console.log(user)
                return res.status(200).send({message:"sign up successful", status:true, user:userData})
            }
        }
        
    } catch (error) {
        console.log(error)
        
    }

}

const loginUser = async(req, res) =>{
    try {


        
    } catch (error) {
        
    }

}
module.exports = {userSignUp}