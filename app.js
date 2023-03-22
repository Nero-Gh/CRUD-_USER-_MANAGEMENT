//Importing packages
require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
// const { flash } = require("express-flash-message");
// const session = require("express-session");
// const flash = require("connect-flash");

//!importing database connection
const connectDB = require("./server/config/db");

const app = express();
const port = 5000 || process.env.PORT;

//!Connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Method Override
app.use(methodOverride("_method"));

//Static files
app.use(express.static("public"));

//Setup Express Session
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//     },
//   })
// );

//Setup Express Flash Message
// app.use(flash({ sessionKeyName: "flashMessage" }));

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
