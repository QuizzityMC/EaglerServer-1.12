const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { spawn } = require("child_process");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

let mcProcess;

app.use(express.static("public"));
app.use(express.json());

app.post("/send", (req, res) => {
  const { input } = req.body;
  if (mcProcess && mcProcess.stdin.writable) {
    mcProcess.stdin.write(input + "\n");
    res.sendStatus(200);
  } else {
    res.status(500).send("Server not running");
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  if (!mcProcess) {
    mcProcess = spawn("java", ["-jar", "server.jar"], {
      cwd: "server", // ✅ Run server.jar from inside /server folder
      shell: true,
    });

    mcProcess.stdout.on("data", (data) => {
      socket.emit("output", data.toString());
    });

    mcProcess.stderr.on("data", (data) => {
      socket.emit("output", data.toString());
    });

    mcProcess.on("close", (code) => {
      socket.emit("output", `\n[SERVER CLOSED WITH CODE ${code}]\n`);
      mcProcess = null;
    });
  }

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
