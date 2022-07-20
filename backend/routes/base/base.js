var express = require("express");
var app = express.Router();

app.get("/", async function(req, res) {
  res.redirect("https://www.google.com");
});

app.post("/", function(req, res) {
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.put("/", function(req, res) {
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/", function(req, res) {
  res.json({ success: "delete call succeed!", url: req.url });
});

module.exports = app;
