const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;
let mcProcess;

const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));
app.use(express.json());

// Minecraft command
app.post("/send", (req, res) => {
  const { input } = req.body;
  if (mcProcess && mcProcess.stdin.writable) {
    mcProcess.stdin.write(input + "\n");
    res.sendStatus(200);
  } else {
    res.status(500).send("Server not running");
  }
});

// Start bungee silently
spawn("sudo", ["java", "-jar", "bungee.jar"], {
  cwd: "bungee",
  detached: true,
  stdio: "ignore",
  shell: true,
}).unref();

// Explorer - list
app.get("/explorer", (req, res) => {
  const dirPath = path.join(__dirname, "server", req.query.path || "");
  fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
    if (err) return res.status(500).send("Unable to read directory");
    const files = entries.map((entry) => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
    }));
    res.json({ path: req.query.path || "", files });
  });
});

// Explorer - view
app.get("/explorer/view", (req, res) => {
  const filePath = path.join(__dirname, "server", req.query.file);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Unable to read file");
    res.send(data);
  });
});

// Explorer - save
app.post("/explorer/save", (req, res) => {
  const filePath = path.join(__dirname, "server", req.body.file);
  fs.writeFile(filePath, req.body.content, "utf8", (err) => {
    if (err) return res.status(500).send("Unable to save file");
    res.sendStatus(200);
  });
});

// Explorer - upload
app.post("/explorer/upload", upload.single("file"), (req, res) => {
  const targetDir = path.join(__dirname, "server", req.body.path || "");
  const targetPath = path.join(targetDir, req.file.originalname);
  fs.rename(req.file.path, targetPath, (err) => {
    if (err) return res.status(500).send("Upload failed");
    res.sendStatus(200);
  });
});

// Explorer - delete
app.post("/explorer/delete", (req, res) => {
  const filePath = path.join(__dirname, "server", req.body.file);
  fs.rm(filePath, { recursive: true, force: true }, (err) => {
    if (err) return res.status(500).send("Delete failed");
    res.sendStatus(200);
  });
});

// Explorer - download
app.get("/explorer/download", (req, res) => {
  const filePath = path.join(__dirname, "server", req.query.file);
  res.download(filePath);
});

// Socket for logs
io.on("connection", (socket) => {
  console.log("User connected");

  if (!mcProcess) {
    mcProcess = spawn("java", ["-jar", "server.jar"], {
      cwd: "server",
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
