// Import express and instantiate it
import express from "npm:express@4";
const app = express();

// Register a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Run the server!
app.listen(80)