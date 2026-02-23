const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let sessions = {};

function checkWin(sessionId) {
  const session = sessions[sessionId];
  if (!session) return;

  const tasks = Object.values(session.tasks);
  if (tasks.length && tasks.every(Boolean)) {
    session.gameStarted = false;
    io.to(sessionId).emit("game-won");
  }
}

io.on("connection", (socket) => {
  socket.on("create-session", (sessionId) => {
    sessions[sessionId] = {
      tasks: {},
      gameStarted: false,
      startTime: null,
    };
    socket.join(sessionId);
  });

  socket.on("join-session", ({ sessionId, userId }) => {
    const session = sessions[sessionId];
    if (!session) return;

    socket.join(sessionId);
    session.tasks[userId] = false;

    io.to(sessionId).emit("update-session", session);
  });

  // ---------------- Start Game ----------------
  socket.on("start-game", (sessionId) => {
    const session = sessions[sessionId];
    if (!session) return;

    // reset all tasks
    Object.keys(session.tasks).forEach((k) => {
      session.tasks[k] = false;
    });

    session.gameStarted = true;
    session.startTime = Date.now();

    io.to(sessionId).emit("update-session", session);
    io.to(sessionId).emit("clear-alert");
  });

  // ---------------- End Game ----------------
  socket.on("end-game", (sessionId) => {
    const session = sessions[sessionId];
    if (!session) return;

    // reset all tasks
    Object.keys(session.tasks).forEach((k) => {
      session.tasks[k] = false;
    });

    session.gameStarted = false;
    session.startTime = null;

    io.to(sessionId).emit("update-session", session);
  });

  // ---------------- Toggle Task ----------------
  socket.on("toggle-task", ({ sessionId, userId, status }) => {
    const session = sessions[sessionId];
    if (!session || !session.gameStarted) return;

    session.tasks[userId] = status;

    io.to(sessionId).emit("update-session", session);
    checkWin(sessionId);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
