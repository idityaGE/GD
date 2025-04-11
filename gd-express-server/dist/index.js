"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Initialize the express application
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware setup
app.use((0, cors_1.default)({
    origin: "*"
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is running"
    });
});
// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
