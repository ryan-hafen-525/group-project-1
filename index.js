const express = require("express");
const path = require("path");
require("dotenv");

let app = express();
const PORT = 3000;

const knex = require("knex")({
   client: "mysql",
   connection: {
      host: process.env.HOST || "destinationdatabase.c1yagq6gyws4.us-east-2.rds.amazonaws.com",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "admin",
      password: process.env.DB_PASSWORD || "welove531",
      database: process.env.DB_DATABASE || "vacation_destinations",
   },
});

// Configure EJS templating and static assets
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "public")));

// Routes rendering EJS views
app.get("/", (req, res) => {
   // Mirror the /destinations behavior: try to load from the DB when knex is configured,
   // otherwise fall back to demo data so the root path always shows the destinations grid.
  knex
      .select("*")
      .from("vacation_spots")
      .then((data) => {
        // Render the destinations data into `index.ejs` (user requested root use index.ejs)
        res.render("index", { title: "Home", destinations: data });
      })
      .catch((err) => {
        console.error("Error loading destinations:", err);
        res.status(500).send("Unable to load destinations");
      });
});

app.get("/about", (req, res) => {
   res.render("about", { title: "About" });
});

// Demo route for local testing without the database: static sample destinations
app.get("/destinations-demo", (req, res) => {
   const demo = [
      { name: "Santa Monica Pier", image_url: "https://via.placeholder.com/800x600?text=Santa+Monica" },
      { name: "Yellowstone", image_url: "https://via.placeholder.com/800x600?text=Yellowstone" },
      { name: "Grand Canyon", image_url: "https://via.placeholder.com/800x600?text=Grand+Canyon" },
      { name: "New York City", image_url: "https://via.placeholder.com/800x600?text=New+York" },
      { name: "Tokyo", image_url: "https://via.placeholder.com/800x600?text=Tokyo" },
   ];
   res.render("destinations", { title: "Destinations (demo)", destinations: demo });
});

app.listen(PORT, () => {
   console.log("App running sucessfully");
});
