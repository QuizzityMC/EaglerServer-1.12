const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const FILE_PATH = "./data/config.yml"; // or .properties

app.use(cors());
app.use(bodyParser.text({ type: "*/*" }));

// Get file contents
app.get("/file", (req, res) => {
  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).send("Failed to load file");
    res.send(data);
  });
});

// Save updated file
app.post("/file", (req, res) => {
  fs.writeFile(FILE_PATH, req.body, "utf8", (err) => {
    if (err) return res.status(500).send("Failed to save file");
    res.send("File saved successfully");
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
