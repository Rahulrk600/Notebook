const mongoose = require("mongoose");

const mongodb ="mongodb://127.0.0.1:27017/my-notebook";

const connectDB = ()=>{
    
    return mongoose.connect(mongodb, {
        useNewUrlParser:true,
        useUnifiedTopology:true
          
    }).then(()=>{
        console.log("connection is successful");
    }).catch((e)=>{
        console.log("no connection");
    })
};

module.exports = connectDB;