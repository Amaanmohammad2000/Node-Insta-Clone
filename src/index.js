require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const PORT = 5000;

mongoose.connect(process.env.DATABASE_URL + process.env.DB_NAME)
.then(()=>{
    console.log("Connected to DB");
})
.catch(()=>{
    console.log("Error while connecting to DB");
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}...`);
})