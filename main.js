const express = require('express');
const fs = require('fs');
require('dotenv').config();
const path = require('path');

const app = express();

app.listen(process.env.PORT, () => {console.log(`Server listening to port ${process.env.PORT}`)});

app.use(express.static(path.join(__dirname, '/views/public')));
/*app.set('view engine', 'html');*/
app.use(express.static('views'));
//app.get('/', (req, res) => res.render('/views/public/index.html'));
app.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/css')
    res.header("Content-Type",'application/json');
    res.render('/views/public/index.html')
});