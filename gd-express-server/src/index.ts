// Import necessary modules
import express from "express"
import cors from "cors"

// Initialize the express application
const app = express()
const PORT = 3000

// Middleware setup
app.use(
  cors({
    origin: "*"
  }),
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running"
  })
})

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT)
})
