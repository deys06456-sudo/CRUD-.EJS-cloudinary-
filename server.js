require("dotenv").config();

const express = require ('express');
const ejs = require ('ejs');
const path = require ('path');

const DBConnection = require ('./src/config/dbcon');

const app = express();

DBConnection();

app.set('view engine','ejs');
app.set('views','./src/view');

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

const teacherRouter = require('./src/router/teacher.router');
app.use('/',teacherRouter);


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server is runing ${port}`)
})