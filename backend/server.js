const express = require('express');
const app = express();
const mongoose = require("mongoose")
const dotenv = require('dotenv');
dotenv.config()
const userRouter = require("./routes/userRoute")
const cors = require('cors');

app.use(express.json())
app.use(cors());
mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("Database Connected Succesfully")
        app.listen(process.env.PORT || 8000, (err)=>{
            if(err) console.log(err);
            console.log("Running Sucessfully at ", process.env.PORT);
        });

    })
    .catch((error)=>{
        console.log("error", error);
    });

    app.use(userRouter);
