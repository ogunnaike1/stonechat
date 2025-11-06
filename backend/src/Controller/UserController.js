const mongoose = require("mongoose")
const userModel = require("../models/UserModel")
const bcrypt = require("bcryptjs");


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

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await  userModel.create({
                username,
                email,
                password: hashedPassword
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required", status: false });
          }
          
          const user = await userModel.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: "User not found", status: false });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({ message: "Invalid password", status: false });
          }

          const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
          };

          return res.status(200).json({
            message: "Login successful",
            status: true,
            user: userData,
          });
      
        
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error", status: false });
        
    }

}
module.exports = {userSignUp, loginUser }