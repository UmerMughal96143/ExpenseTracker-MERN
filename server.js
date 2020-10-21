const express = require('express');
const dotenv = require('dotenv');
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require('./config/db');
dotenv.config({path : './config/config.env'})

const transactions = require('./routes/Transactions');
const users = require('./routes/User');
const { json } = require('express');
connectDB();
const app = express();
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000 ;

app.use('/api/v1/transactions' , transactions);
app.use("/api/v1/users" , users);


app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.brightBlue.bold
  )
);
