require("dotenv").config();

const express = require ('express');
const ejs = require ('ejs');
const path = require ('path');

const DBConnection = require ('./src/config/dbcon');

const app = express();

// Database Connection
DBConnection();

// EJS Configuration
app.set('view engine','ejs');
app.set('views','./src/view');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Static Files
app.use(express.static(path.join(__dirname,'public')));

// Local uploads (only needed if using local image storage)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

// Teacher Router
const teacherRouter = require('./src/router/teacher.router');
app.use('/',teacherRouter);

// Server
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server is runing ${port}`)
})