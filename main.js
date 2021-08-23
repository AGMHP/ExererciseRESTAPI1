const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const namelst = ["Maulik","MH","MHAghori","AghoriMH"];

app.get('/',  (req, res) => {
  res.send('Hey there, just a normal app showing'+
  " <br> how I use express customizable urls and fetch json data." 
  +'<br>  Please try out this urls: <br> >/examples/(gameid) <br> >/ejs <br>>/movie <br>>/search'
  +'<br>>/request <br> >/post <br> <b>Thanks for visiting.</b>   ');
});

app.get('/examples/:games', (req, res)=> {
  const nAme = req.params.games;
  res.render('games', {name : nAme});
});

app.get('/ejs', (req, res)=> {
  res.render('hello', {namq: namelst});
})

app.get('/movie', (req, res)=> {
  res.render('searchformovie');
})

app.get("/post", (req,res)=>{
  res.render("postrequest", {namq : namelst})
});

app.post("/request",(req,res) =>{  
  namelst.push(req.body.newHolder);
  res.redirect("/ejs");
});

app.get("/search", (req,res) =>{
  let search = req.query.search;
  request("http://omdbapi.com/?s="+search+"&i=tt3896198&apikey=thewdb",(error,response,body)=> {
    if (!error && response.statusCode == 200) {
       var data = JSON.parse(body);
       res.render("movie", {data: data});
    } 
 });
});

app.get('*',  (req, res) => {
  res.send('Sorry couldn\' find it.');
});

app.listen(3000, () => {
    console.log("running at 3000");
});


