//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { forEach } = require("lodash");
const _ = require("lodash");

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//This array stores all our composed post objects
let posts = [];

// root route
app.get("/",function (req,res){
  res.render("home",{
    posts : posts,
  });
  

});

//contact page route
app.get("/contact",function (req,res){
  res.render("contact",{
    contactContent : contactContent
  });

});

// routes to about page
app.get("/about",function (req,res){
  res.render("about",{
    aboutContent : aboutContent
  });

});

//this route renders the compose page
app.get("/compose",function (req,res){
  res.render("compose");
  
});

//route to read blogs individually
app.get("/posts/:Param",function(req,res){
  const requestedTitle = _.lowerCase(req.params.Param);
  posts.forEach(element => {
    const storedTitle = _.lowerCase(element.title);
    if(requestedTitle === storedTitle){
      res.render("post",{
        title : element.title,
        content : element.content
      });
      console.log("match found!");
    }
  });
});


//the route to post our blogs from /compose route
app.post("/compose",function(req,res){
  const post = {
    title : req.body.postTitle,
    content : req.body.postBody
  }
  posts.push(post);

  
  res.redirect("/");
});




app.listen(port, function() {
  console.log("Server started on port 3000");
});
