"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/modules/config"));
const app_1 = __importDefault(require("./app"));
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.db_uri);
        console.log("✅ Database Connected Successfully!");
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`✅ Server is running on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
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
 * Signal Termination (Sigterm)
 */ 
