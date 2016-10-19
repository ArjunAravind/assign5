const path = require('path')  
const port='3000';
const express = require('express')  
const exphbs = require('express-handlebars')
var app=express();
var uname;
var pname;
var lname;
var lpass;
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'images')));
app.engine('.hbs', exphbs({  
  defaultLayout: 'page1',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))  
app.get('/', (req, res) => {  
  	res.render("page2",{});
});  
app.get('/page3',(req,res) =>{
	res.render('page3',{})
})
app.get('/page4',(req,res) =>{
	res.render('page4',{})
});
app.get('/page5',(req,res) =>{
	res.render('page5',{})
});  
app.listen('3000'); 
 app.use(bodyParser.urlencoded({
    extended: true
}));  

var mongo=require('mongodb');
var mongoClient=mongo.MongoClient;
var url="mongodb://arjun:aju@ds061076.mlab.com:61076/data";

mongoClient.connect(url,function(err,db){
  console.log("huhyuhyui");
  var uc=db.collection("collect"); 

app.post('/page3',function(newreq,newres){
	 uname=newreq.body.firstname;
	 pname=newreq.body.password;
	console.log(uname);
	console.log(pname);
uc.insert({username: uname, password: pname}); 
newres.redirect('/page3');


}) 
app.post('/page3',function(newreq,newres){
	 lname=newreq.body.firstname;
	 lpass=newreq.body.password;
   uc.find({username:lname}).toArray(function(e,o){
    if(o.length==0){
      uc.insert({username:lname,password:lpass});
      newres.redirect('/page3');
    }
    });
}) 

app.post('/page5',function(newreq,newres){
	 lname=newreq.body.textfield;
	 lpass=newreq.body.upassword;
 uc.find({username:lname,password:lpass}).toArray(function(e,o) 
{
    if(o.length>0){
      // uc.insert({username:lname,password:lpass});
      newres.redirect('/page5');
    }else{
    	console.log("afsf");
    }
    });
}) 

}) 

