//Importing packages
require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

//!importing database connection
const connectDB = require("./server/config/db");

const app = express();
const port = 5000 || process.env.PORT;

//!Connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static files
app.use(express.static("public"));

//Template Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", require("./server/routes/customer"));

//!Handle 404 error
app.get("*", (req, res) => {
  res.status(404).render("404");
});

//*Starting server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
