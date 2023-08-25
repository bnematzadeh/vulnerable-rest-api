const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    credit: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: 'USER'
    }
})

userSchema.methods.generateToken = function(){
    const privateKey = fs.readFileSync(__dirname+'/../cert/private_key.key');
    const token = jwt.sign({_id: this._id, name: this.name, role: this.role, username: this.username, website: this.website, credit: this.credit}, privateKey, { algorithm: 'RS256'});
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;