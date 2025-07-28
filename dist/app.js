"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.get("/", (req, res) => {
    try {
        res.status(200).json({
            message: "✅ Tour Management Server is Running...",
        });
    }
    catch (error) {
        res.json({
            message: "✅ Something Went Wrong!",
            error: error,
        });
    }
});
exports.default = app;
