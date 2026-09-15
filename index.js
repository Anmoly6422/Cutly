const express = require('express');
const {connectToMongoDB}= require('./connect');
const urlRoute= require('./routes/url');


const app = express();
const PORT = 8001;


connectToMongoDB('mongodb://localhost:27017/cutly')
.then(()=>console.log('Mongodb connected'))

app.use("/url",urlRoute);

app.listen(PORT,()=> console.log(`Server Started at Port: ${PORT}`))