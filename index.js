const express = require("express");
const path = require("path");
require("dotenv");

let app = express();
const PORT = 3000;

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

// Configure EJS templating and static assets
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "public")));

// Routes rendering EJS views
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.listen(PORT, () => {
    console.log("App running sucessfully");
})
