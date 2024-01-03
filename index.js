require('dotenv').config();
var express = require('express');
var os = require('os');
var app = express();
const eLayouts = require("express-ejs-layouts")

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout')
app.use(eLayouts)

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render("index.ejs")
});


app.get("/api/whoami/", function (req, res) {
//console.log("os.networkinterfaces", os.networkInterfaces())
  let data = os.networkInterfaces();
  let addr = [];
  let address ;
  for( prop in data){
    for (item of data[prop]){
      if(item['family']=="IPv4" || item['family']=='4'){
        if(!item['internal']){
          let temp = `${prop}:${item['address']}`;
          addr.push(temp);
        }
      }
    }
  }
  //console.log('addr', addr)
  if(addr.length == 0 ) address = req.ip ;
  else   address = ` { ${addr.join(" ; ")} }`;

  let answer  = {ipaddress: address , language: req.headers["accept-language"], software: req.headers["user-agent"]};
  res.render('whoami', { answer: answer })
});

// listen for requests 
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
