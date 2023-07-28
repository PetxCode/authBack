import express, { Application } from "express";
import env from "dotenv";
import { db } from "./config/db";
import { mainApp } from "./mainApp";
env.config();

const port: number = parseInt(process.env.PORT!);

const app: Application = express();

mainApp(app);

const server = app.listen(process.env.PORT || port, () => {
  console.log("");
  db();
});

process.on("uncaughtException", (error: Error) => {
  console.log("shutting down due to uncaughtException Error");
  console.log("Error: ", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("shutting down due to unhandledRejection Error");
  console.log("Error: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
