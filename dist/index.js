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
// Sample data for Todos
const Todos = [
    {
        id: 1,
        title: "Eat",
        isCompleted: true
    },
    {
        id: 2,
        title: "Sleep",
        isCompleted: false
    },
    {
        id: 3,
        title: "Code",
        isCompleted: false
    },
    {
        id: 4,
        title: "Repeat",
        isCompleted: false
    }
];
// Middleware setup
app.use((0, cors_1.default)({
    origin: "*"
}), express_1.default.json(), express_1.default.urlencoded({ extended: true }));
// Define routes
// Root route
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
// Get all todos
app.get("/todos", (req, res) => {
    res.status(200).json(Todos);
});
// Get a specific todo by id
app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = Todos.find(todo => todo.id === id);
    if (todo) {
        res.status(200).json(todo);
    }
    else {
        res.status(404).json({ message: "Todo not found" });
    }
});
// Get todos by completion status using query parameters
app.get("/todos/completed", (req, res) => {
    const { isCompleted } = req.query;
    if (isCompleted !== undefined) {
        const filteredTodos = Todos.filter(todo => todo.isCompleted.toString() === isCompleted);
        res.status(200).json(filteredTodos);
    }
    else {
        res.status(400).json({ message: "Query parameter 'isCompleted' is required" });
    }
});
// Mark a specific todo as complete
app.patch("/todos/:id/complete", (req, res) => {
    const id = parseInt(req.params.id);
    const todo = Todos.find(todo => todo.id === id);
    if (todo) {
        todo.isCompleted = true;
        res.status(200).json({ message: "Todo marked as complete" });
    }
    else {
        res.status(404).json({ message: "Todo not found" });
    }
});
// Add a new todo
app.post("/todos", (req, res) => {
    const { title } = req.body;
    if (title) {
        const newTodo = {
            id: Todos.length + 1,
            title,
            isCompleted: false
        };
        Todos.push(newTodo);
        res.status(201).json({ message: "Todo added successfully", todo: newTodo });
    }
    else {
        res.status(400).json({ message: "Title is required" });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
