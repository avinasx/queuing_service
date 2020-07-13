var express = require("express");
var app = express();
var fs = require("fs");
app.get("/getnextnumber",function(req,res){

  if (req.headers['username'] == null || req.headers['key'] == null){
    console.log("Header missing");
    return res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
  //  res.status(400).json({ error: 'missing headers' }).send();
  //res.end();
  }
  let response = null;
  fs.readFile( __dirname + "/" + "userData.json", 'utf8', function (err, data) {
        console.log( data );


        data = JSON.parse(data);
        //console.log(data.users[0].data.number);
        var username = req.headers['username'];
        console.log(username);
        var key = req.headers['key'];
        console.log(key);
        let userData = data[username];
        //var userData = data.users.filter(user => user.username == username && user.password == password );//if users are stored as an array
        //console.log(userData);
        if (userData == null){
          return res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
          //res.status(400).json({ error: 'missing headers' }).send();
          //res.end();
        }
        console.log(userData);

        let count = userData.data.number + 1;
        userData.data.number = count;
        data[username] = userData;
        console.log(data);

        fs.writeFile( __dirname + "/" + "userData.json", JSON.stringify(data), function (err,data) {
          if (err) {
            return res.sendStatus(500);
          }
        });
        console.log(count);
        response ={"number":count};
        res.setHeader('Content-Type', 'application/json');
        //res.end(data.toString());
        res.write( JSON.stringify(response) );
        return res.end();

     });

   //   fs.writeFile( __dirname + "/" + "userData.json", userDetails, function (err,userDetails) {
   //   if (err) {
   //     return res.sendStatus(500);
   //   }
   // });
     // 400 Bad Request

});

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);
});
app.put("/updatenumber",(req,res)=>{

  if (req.headers['username'] == null || req.headers['key'] == null){
    console.log("Header missing");
    return res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
  //  res.status(400).json({ error: 'missing headers' }).send();
  //res.end();
  }

  fs.readFile( __dirname + "/" + "userData.json", 'utf8', function (err, data) {
        console.log( data );


        data = JSON.parse(data);
        //console.log(data.users[0].data.number);
        var username = req.headers['username'];
        console.log(username);
        var key = req.headers['key'];
        console.log(key);
        let userData = data[username];
        //var userData = data.users.filter(user => user.username == username && user.password == password );//if users are stored as an array
        //console.log(userData);
        if (userData == null){
          return res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
          //res.status(400).json({ error: 'missing headers' }).send();
          //res.end();
        }
        console.log(userData);
        var number = parseInt(req.body.number);
        //let count = userData.data.number + 1;
        console.log(number);
        if (number < 0 || isNaN(number)){
          console.log(number);
          return res.status(400).json({error:"invalid number"});
        }
        userData.data.number = number;
        data[username] = userData;
        console.log(data);

        fs.writeFile( __dirname + "/" + "userData.json", JSON.stringify(data), function (err,data) {
          if (err) {
            return res.sendStatus(500);
          }
        });
        //console.log(count);
        response ={"number":number};
        res.setHeader('Content-Type', 'application/json');
        //res.end(data.toString());
        res.write( JSON.stringify(response) );
        return res.end();

     });


});
app.post('/bad-request', (req, res) => {
        res.status(400).send({message : "You are missing vital credentials"});
});
var server = app.listen(8080,function(){

  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
