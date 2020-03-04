var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/auto_mail',  { useNewUrlParser: true, useUnifiedTopology: true });


var infoSchema = new mongoose.Schema({
    instru: {
        accx: Number, 
        accy: Number, 
        vg: Number,
        velox: Number, 
        veloy: Number, 
        distan: Number,
        angulo: Number,
        bate: Number, 
        enco1: Number,
        enco2: Number,
        ultra1: Number,
        ultra2: Number, 
        ultra3: Number},
        status: {
            modo: Number
        },
        coord: {
            x: Number,
            y: Number},
        erros: Array,
    ultimaMenssagem: Number
   
}, { collection: 'infoMailCar' }
);
 
module.exports = { Mongoose: mongoose, InfoSchema: infoSchema }     