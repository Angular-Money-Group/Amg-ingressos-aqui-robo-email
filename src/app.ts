import { EmailRouter } from './app/routes/emailRouter';
import { Logger } from './app/services/logger.service';
import { connection } from "./app/Infra/dbConnection";
import cors from "cors";
import express from "express";
import mongoose from 'mongoose';

export class App {
  public server: any;

  constructor(
    private emailRouter: EmailRouter,
  ) {
    this.server = express();
    this.swagger();
    this.middleware();
    this.router();
    this.connectDB();
  }

  private middleware() {
    const corsOptions = {
      origin: "*",
      methods: ["GET", "PUT", "POST", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };

    this.server.use(express.json());
    this.server.use(cors(corsOptions));
  }

  private connectDB() {
    Logger.infoLog("Connecting to database");
    connection();

  }

  private router() {
    Logger.infoLog("Loading routes");
    this.server.use("/v1/email", this.emailRouter.emailRouter);

  }

  private swagger() {
    // this.server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs))
  }
}
