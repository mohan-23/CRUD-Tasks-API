const express = require("express");
const mongoose = require("mongoose");
const TaskRouter = require("./routing");
const serverless = require("serverless-http");
const router = express.Router();
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    "mongodb+srv://mohanTask:Task9177@tasks-api.rl24flr.mongodb.net/?retryWrites=true&w=majority&appName=tasks-api"
  )
  .then(() => {
    console.log("Connected to Database!");
    app.listen(4001, (req, res) => {
      console.log("Server is running on the port 4001");
    });
  })
  .catch(() => {
    console.log("Connection Failed!");
  });

//Routes
app.use("/tasks", TaskRouter);
app.use("/register", TaskRouter);
app.use("/login", TaskRouter);

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
