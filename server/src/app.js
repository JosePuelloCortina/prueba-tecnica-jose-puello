const express = require('express'); 
const morgan = require('morgan'); 
const cors = require('cors');
const routes = require('./routes/routes'); 

const app = express();

app.use(morgan('dev'));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})); 

app.use(express.json());
app.use(routes); 

module.exports = app;