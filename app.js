import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import loginRouter from "./routes/login.js";
import getUrl from "./routes/getUrl.js";
import newShortcutRouter from "./routes/newShortcut.js";
import shortcutRedirectRouter from "./routes/shortcutRedirect.js";

const setApplication = (app) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/getUrl", getUrl);
  app.use("/login", loginRouter);
  app.use("/newShortcut", newShortcutRouter);

  app.use((req, res, next) => {
    shortcutRedirectRouter(req, res, next);
  });
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
    res.send(err.message);
  });
};

export default setApplication;
