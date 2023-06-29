//entry point for the application

const express = require('express');
const connectDB = require('./config/db');

const PORT = 8080;

const app = express();
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`server run on port ${PORT} ✅`);
  });