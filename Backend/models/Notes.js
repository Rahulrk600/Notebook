const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require:true,
    },
    tag:{
        type: String,
        default:'General'
    },
    date:{
        type: Date,
        default:Date.now
    }
});
const notes = new mongoose.model('notes',NotesSchema);
module.exports = notes;