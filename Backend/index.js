const connectDB = require('./conn');
const express = require("express");
var Cors = require("cors")

const PORT = process.env.PORT || 8000;
const app = express();
app.use(Cors())
app.use(express.json());


//Available Route
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



const star = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`my-notebook backend setup at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

star();