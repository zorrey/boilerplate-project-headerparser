require('dotenv').config();
var express = require('express');
var os = require('os');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const internal = require('stream');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/whoami/", function (req, res) {

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
  console.log('addr', addr)
  if(addr.length == 0 ) address = req.ip ;
  else   address = ` { ${addr.join(" ; ")} }`;

  res.json({ipaddress: address , language: req.headers["accept-language"], software: req.headers["user-agent"]});
});

// listen for requests 
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
