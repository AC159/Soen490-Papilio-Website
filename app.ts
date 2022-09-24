const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const blogRoutes = require("./route/blog.js");
const dashboardRoutes = require("./route/dashboard.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", blogRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(3001, () => {
  console.log("Server listening on port 3001...");
});
