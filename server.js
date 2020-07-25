const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes/items");
const cors = require("cors");
const port = parseInt(process.env.PORT, 10) || 5000;
const app = express();

dotenv.config();

//Connect to Mongo DB
mongoose.connect(
  process.env.DB_CONNECT_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("> Connected to MongoDB");
  }
);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/item", itemRoutes);

app.get("/", (req, res) => {
  res.send("welcome to home");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
