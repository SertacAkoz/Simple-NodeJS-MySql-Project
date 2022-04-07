const { response } = require('express');
const express = require('express')
const app = express()
const cors = require('cors');


app.use(cors({
    origin: '*'
}));


const connection = require('./routes/connection')
const routerPano = require('./routes/pano');
const router = require('./routes/pano');

app.use('/pano', routerPano)

app.get('/', function(req, res) {

    const list = ["123", "456", "789"]

    const object = {

    }

    for (let index = 0; index < list.length; index++) {

        object[list[index]] = list[index]

    }

    res.send(object)

    res.send('Listening port on 3000');
})

console.log('Listening port on 3000');
app.listen(3000)