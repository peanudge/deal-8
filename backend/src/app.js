import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import multer from "multer";
import mysqlConnection from "./config/mysql.js";
import indexRouter from "./routes/index.js";

const __dirname = path.resolve();

// Mysql Setting
mysqlConnection.connect(function (err) {
  if (err) throw err;
});

// Multer Setting
const storage = multer.diskStorage({
  destination: path.join(__dirname, "/public/upload/"),
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Multer Upload Middleware Setting
export const upload = multer({
  storage: storage,
}).array("product_image", 10);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));

// express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "adnifneaoifdnaoisunfg",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
