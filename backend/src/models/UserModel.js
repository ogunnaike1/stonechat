const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required: true},
    password:{type:String, required: true},
})

const userModel = mongoose.model("user_collection", UserSchema)

module.exports = userModel