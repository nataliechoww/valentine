const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    password: String
})

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel