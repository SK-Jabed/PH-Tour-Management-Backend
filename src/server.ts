import { Server } from "http";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URI);

    console.log("✅ Database Connected Successfully!");

    server = app.listen(envVars.PORT, () => {
      console.log(`✅ Server is running on port: ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// ----- Unhandled Rejection Error -----
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected, Shutting Down the server...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("I forgot to catch this promise..."));

// ----- Uncaught Exception Error -----
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception detected, Shutting Down the server...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// throw new Error("I forgot to handle this local error...");

// ----- Signal Termination (SIGTERM) -----
process.on("SIGTERM", (err) => {
  console.log("SIGTERM signal received, Shutting Down the server...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

/**
 * * --- Error handlers ---
 * Unhandled Rejection Error
 * Uncaught Exception Error
 * Signal Termination (SIGTERM)
 */