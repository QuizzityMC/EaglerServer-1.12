const express = require("express");
const { exec, spawn } = require("child_process");
const app = express();
const PORT = 3000;

app.use(express.static("web"));

// Run server.jar
exec("cd server && java -jar server.jar", (err) => {
  if (err) console.error("server.jar failed:", err.message);
  else console.log("server.jar started");
});

// Run bungee.jar in background
const bungee = spawn("java", ["-jar", "bungee.jar"], {
  cwd: "./bungee",
  detached: true,
  stdio: "ignore",
});
bungee.unref(); // Keeps running after main process ends

app.listen(PORT, () => {
  console.log(`Web server running at http://localhost:${PORT}`);
});
