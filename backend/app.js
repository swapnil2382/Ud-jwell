const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const AppError = require("./utils/appArror");
const globalErrorHandler = require("./controllers/errorController");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const jewelleryRouter = require("./routes/jewelleryRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const wishlistRouter = require("./routes/wishlistRoutes");
const newArrivalRouter = require("./routes/newArrivalRoutes");

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.json({ limit: "4Mb" }));
app.use(cookieParser());

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/jewellery", jewelleryRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/wishlists", wishlistRouter);
app.use("/api/v1/new-arrivals", newArrivalRouter);

// CUSTOM ERROR MESSAGE FOR UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;