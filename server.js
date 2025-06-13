const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/execute", (req, res) => {
  const { command } = req.body;

  if (!command) return res.status(400).send("No command provided");

  // Split the command into command and args
  const parts = command.split(" ");
  const cmd = parts[0];
  const args = parts.slice(1);

  const child = spawn(cmd, args, { shell: true });

  let output = "";

  child.stdout.on("data", (data) => {
    output += data.toString();
  });

  child.stderr.on("data", (data) => {
    output += data.toString(); // Include errors too
  });

  child.on("close", (code) => {
    res.send(output || `Command exited with code ${code}`);
  });

  child.on("error", (err) => {
    res.status(500).send(`Failed to start command: ${err.message}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
