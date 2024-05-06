const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db");

const server = express();

connectDB(process.env.MONGO_URI);

server.use(cors());
server.use(express.json());

server.use("/api", require("./routes/api"));

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
