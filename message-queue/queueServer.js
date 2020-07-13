// import queue from "./queue.js";
var express = require("express");
var app = express();
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
var Queue = require("./queue");
var messageQueue = Queue.queue;

app.post("/addMessage",(req,res)=>{
let msgs = req.body.message;
for (msg of msgs){
messageQueue.enQueue(msg);
}
messageQueue.display();
res.sendStatus(200);
});

app.get("/getMessage",(req,res)=>{
  var msg = messageQueue.deQueue();
  //messageQueue.display();
  let response = {"message":msg};
  res.status(200).json(response);
});

app.post("/ackGetMessage",(req,res)=>{
  var ackMsg = req.body.recieved;
  messageQueue.ackMessage(ackMsg);
  messageQueue.display();
  res.sendStatus(200);
});



var server = app.listen(8080,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
