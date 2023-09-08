// Import express and instantiate it
import express from "npm:express@4"
const app = express()

// Register a route
app.get("/", (req: any, res: any) => {
    res.send("Yes")
})

// Run the server!
app.listen(80)