//entry point for the application

const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');

const PORT = 8080;

const app = express();
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);

app.use("/", (req, res) => {
  res.send(`${req.method} Route ${req.path} not found !`);
});
app.listen(PORT, () => {
    console.log(`server run on port ${PORT} ✅`);
  });