const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
var multer = require('multer');

// database

mongoose.connect('mongodb://127.0.0.1:27017/sns', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((success) => {
        console.log('Mongodb Connected');
    })

mongoose.connection.on("error", err => {
    console.log('Mongo Connection Error', err);
});

// routes to routes
const postRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const followRouter = require("./routes/follow");


// middlewares
app.use(morgan("dev"));
app.use(bodyparser.json({
    extended: true
}));
app.use(expressValidator());
app.use(cookieparser());
app.use(cors());

//direct routers 
app.use("/", postRouter);
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", followRouter);

app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({
            error: "Unauthorized !"
        })
    }
});

const port = 8080;

app.listen(port, () => {
    console.log('Welcome to Sponikle , "THE SOCIAL NETWORK REDIFINED"');
});



// =================================== "AUTHER DETAILS"=============================================
// this application is originally written by Biswas Sampad on 06/05/2020
// this is meant to be the backend server of sponikle.com
// sponikle stands for social platform of natural intelligence in designed for knowledge and linguistic exchanges 
// our moto is a safe secure and easy social platform for each and every human with internet 
// "The Social Network Re-defined"
// email : biswassampads@rediffmail.com && biswassampad@sponikle.com
// ===================================== "THE END"=============================================