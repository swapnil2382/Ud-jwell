const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: " http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

//MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json({ limit: "4Mb" }));
app.use(cookieParser());

//ROUTES
app.use("/", (req, res) => {
  res.json({
    message: "success",
  });
});

module.exports = app;
