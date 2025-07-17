const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appArror");
const globalErrorHandler = require("./controllers/errorController");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const jewelleryRouter = require("./routes/jewelleryRoutes");

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
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter); //for only admins
app.use("/api/v1/jewellery", jewelleryRouter);

//CUSTOM ERROR MESSAGE FOR UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
