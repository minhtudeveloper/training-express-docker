import createError from "http-errors";

import express, { RequestHandler, ErrorRequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "dotenv";
import indexRouter from "./routes/index";
import { ENV as env } from "./config";
import mongoose from "mongoose";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.connectMongo();
    this.routerSetup();
    this.errorHandler();
  }

  private config() {
    // view engine setup

    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  private routerSetup() {
    this.app.use("/api", indexRouter);
  }

  private connectMongo() {
    new Promise<any>((resolve, reject) => {
      // mongoose.set("useCreateIndex", true);
      mongoose.connect(env.MONGODB_URI, {
        autoIndex: true,
      });
      const db = mongoose.connection;
      db.on("error", () => reject("Please install and start your mongodb"));
      db.once("open", resolve);
    })
      .then(() => {
        console.log("connect mongo success");
      })
      .catch((err) => {
        console.log(
          `MongoDB connection error. Please make sure MongoDB is running. ${err}`,
        );
      });
  }

  private errorHandler() {
    // catch 404 and forward to error handler
    const requestHandler: RequestHandler = function (_req, _res, next) {
      next(createError(404));
    };
    this.app.use(requestHandler);

    // error handler
    const errorRequestHandler: ErrorRequestHandler = function (
      err,
      req,
      res,
      _next,
    ) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    };
    this.app.use(errorRequestHandler);
  }
}

export default new App().app;
