// import { createServer } from "http";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const { routes: adminRoutes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((_, res) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
});

app.listen(3001);
