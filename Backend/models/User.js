const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    password:{
        type: String,
        require:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});
const user = new mongoose.model('user',UserSchema);
module.exports = user;