var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//connect  to database
mongoose.Promise = require("bluebird");﻿
mongoose.connect('mongodb://localhost/myapp');
//create a schema blueprint
var articleSchema = new mongoose.Schema({
  head: String,
  art: String,
  img: String,
  url: String
});
var article =mongoose.model("article",articleSchema);

//var data = [{item:"get milk"},{item:"go home"},{item:"sleep"}];


var urlencodedParser=  bodyParser.urlencoded({extended:false});
module.exports= function(app){

app.get("/",function(req,res)
{
  article.find({},function(err,data)
  {
    if(err) throw err;
    res.render("home",{dataa:data});
  });
});

app.get("/tnc",function(req,res)
{
  res.render("tnc");
});

app.get("/todos",function(req,res){
    //get data from mongodb and pass it to the view;
article.find({},function(err,data)
{
  if(err) throw err;
  res.render("todos",{dataa: data});
});
});

app.get("/allarticle",function(req,res){
    //get data from mongodb and pass it to the view;
article.find({},function(err,data)
{
  if(err) throw err;
  res.render("allarticle",{dataa:data});
});
});

app.get("/profile",urlencodedParser,function(req,res)
{
    var a = req.param('id');
    console.log(a);
article.find({_id: a}, function(err,data)
{
  res.render("profile",{dataa: data});
});
});

app.post("/todos",urlencodedParser,function(req,res)
{
  console.log(req.body.head);
  //get data from view and pass it to the mongodb;
article(req.body).save(function(err,data)
{
  if(err) throw err;
  else {
    res.json(data);
    console.log("saved");
  }
})
});

  app.delete("/:head",function(req,res)
{
  article.find({head:req.params.head.replace(/\-/g," ")}).remove(function(err,data)
{
  if(err) throw err;
  res.json(data);
});
});
};
