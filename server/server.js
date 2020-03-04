const express = require('express');
const router = express.Router();
var cors = require('cors')
var fs = require('fs')
const app = express();
const port = process.env.PORT || 8080;
var db = require("./db");
const bodyParser = require("body-parser");
const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

app.use('/api', router);
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.use(bodyParser.json());


const socketIO = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketIO(server)

var ultimaMenssagem = 0

io.on('connection', socket => {
  
 socket.on('getData', () => {
    getData()
   // teste()
      socket.on("disconnect", ()=>{
        console.log("Disconnected")
    })
 })

socket.on('getDataSensores', (information) => {
getDataSensores(function(data){
  io.sockets.emit('getDataSensores', data)
})
})
 
})
function teste(){
    const topicName = 'Car_output';

    //let json = JSON.parse(req.query[0])
    const data = JSON.stringify(  {
        "instru": {
            "accx": "",
            "accy": "",
            "vg": "",
            "velox": "",
            "veloy": "",
            "distan": "",
            "angulo": "",
            "bate": "",
            "enco1": "",
            "enco2": "",
            "ultra1": "",
            "ultra2": "",
            "ultra3": ""},
        "status": {
            "modo": "1"
        },
        "coord": {
            "x": "100",
            "y": "0"
        },
        "erros": []


    });
//console.log(data)
    const dataBuffer = Buffer.from(data);
    const messageId =  pubsub.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
    // publishMessage(topicName, data)

}

server.listen(port, () => console.log(`Listening on port ${port}`))


    function getData(){
      let json
      receberMensagensPubSub(function(data){

        if( ultimaMenssagem === 0){
          getJson()
        }
      })

      //console.log(json)

     // return json
    }













// router.get('/getDataSensores' , (req, res) => {
//   var data
//   res.setHeader('Access-Control-Allow-Origin', '*');  

//   receberMensagensPubSub(function(data){
//     if(data.qtdMensagens === 0){
//         getJson(function(infoJson){
//           json = infoJson
//           json.instru.vg = ""
//           console.log(json)
//           return res.json({ success: true, data: infoJson });
//         })
//     }else if(data.qtdMensagens === 1){
//       salvarJson(data.json[0])
//       return res.json({ success: true, data: data.json[0] });
//       }else{
//         let json = data.json[data.qtdMensagens - 1]
//         salvarJson(json)
//       return res.json({ success: true, data: json});
//       }

//   })

// });
// router.get('/getData' , (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');  

//   var data

//   receberMensagensPubSub(function(data){
//     if(data.qtdMensagens === 0){
//         getJson(function(infoJson){
//           json = infoJson
//           console.log(json)
//           return res.json({ success: true, data: infoJson });
//         })
//     }else if(data.qtdMensagens === 1){
//       salvarJson(data.json[0])
//       return res.json({ success: true, data: data.json[0] });
//       }else{
//         let json = data.json[data.qtdMensagens - 1]
//         salvarJson(json)
//       return res.json({ success: true, data: json});
//       }npm install builtin-modules

//   })

// });


      function receberMensagensPubSub (callback){


        const subscriptionName = 'Web_App';
          const timeout = 2;
          const subscription = pubsub.subscription(subscriptionName);
          let messageCount = 0;
          let json

          const messageHandler = message => {
           // console.log(`\tData: ${message.data}`);
            messageCount += 1;
            // json.push(JSON.parse(message.data))
            // console.log(JSON.parse(message.data))
            message.ack();
              console.log(`Ordem real ${message.publishTime}:`);
              // if(ultimaMenssagem === 0){
              //     getUltimaMsg()
              // }else {
                  if (message.publishTime.getFullTimeString() >= ultimaMenssagem) {
                      json = JSON.parse(message.data)
                      console.log(json)
                      salvarJson(json)

                      console.log(ultimaMenssagem)
                      console.log(`Received message ${message.publishTime}:`);
                      console.log(`full time:  ${message.publishTime.getFullTimeString()}:`);
                      ultimaMenssagem = message.publishTime.getFullTimeString()

                      io.sockets.emit('getData', JSON.parse(message.data), messageCount)
  //                }
              }

          };
          subscription.on(`message`, messageHandler);

          setTimeout(() => {
              subscription.removeListener('message', messageHandler);
              console.log(`${messageCount} message(s) received.`);
              return callback({json: json, qtdMensagens:messageCount })
          }, timeout * 1000);
            
        

          }

      salvarJson = (json) =>{
        var Informacoes = db.Mongoose.model('infoMailCar', db.InfoSchema, 'infoMailCar');
        json.ultimaMenssagem = 1
        var info = new Informacoes(json);

        info.save(function (err) {
            if (err) {
                console.log("Error! " + err.message);
                return err;
              }
            else {
                console.log("Post saved");
              }
            });
          }

        function getJson(){
            var InfoJson = db.Mongoose.model('infoMailCar', db.InfoSchema, 'infoMailCar');
            InfoJson.findOne().lean().exec(
               function (e, docs) {
               //  console.log(docs)
                io.sockets.emit('getData', docs, 0)

               // return callback(docs)

            });
          }
function getUltimaMsg(){
    var InfoJson = db.Mongoose.model('infoMailCar', db.InfoSchema, 'infoMailCar');
    InfoJson.findOne().lean().exec(
        function (e, docs) {
            //  console.log(docs)
                ultimaMenssagem = docs.ultimaMenssagem
            // return callback(docs)

        });
}

router.post('/setData' , (req, res) => {
  const topicName = 'Car_input';

  let json = JSON.parse(req.query[0])
  const data = JSON.stringify( json);
  const dataBuffer = Buffer.from(data);
  publishMessage(topicName, dataBuffer)
  
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.json({ success: false});
})


    async function publishMessage(topicName, dataBuffer){
       const messageId = await pubsub.topic(topicName).publish(dataBuffer);
      console.log(`Message ${messageId} published.`);
}



