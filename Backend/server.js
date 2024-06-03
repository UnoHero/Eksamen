require("dotenv").config();

const express = require('express');
const cors = require("cors");
const default_routes = require('./routes/default');
const user_routes = require("./routes/user.js")

// express app
const app = express()

// cors
app.use(cors())
app.use(express.json());
const {
    mongoConnect
} = require('./handlers/dbhandler.js');

const PORT = process.env.PORT || 3000;
const DBURI = process.env.DBURI || '';

app.use(default_routes);
app.use(user_routes);

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}\n------------------------------------`);
    mongoConnect(DBURI);   
});