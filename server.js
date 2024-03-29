const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemsRouter = require("./routes/items"); // Import routes
const app = express();
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/mahfouzOutlet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected successfully!!"));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/items", itemsRouter); // Mount items router at /items path

// Start server
const port = process.env.PORT || 3000; // Use environment variable or default port
app.listen(port, () => console.log(`Server listening on port ${port}`));
