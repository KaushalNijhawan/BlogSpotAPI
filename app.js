const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/BlogMobile';
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
const blogs = require("./blog.controller.js");
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyparser.urlencoded({extended:false}));

app.use(express.json());


app.post("/blog/data" , blogs.create);

app.get("/blog/data/:name" , blogs.findOne);

app.get("/blog/allData" , blogs.findAll);

app.post("/blog/dataUpdate/:name" , blogs.update);

app.get("/blog/datadelete/:name" , blogs.delete);

app.get("/" ,(req,res)=>{
  res.send("Welcome to Blog API!!");
});

app.listen(3001 , ()=>{
    console.log("Server is Up and Running!");
});
