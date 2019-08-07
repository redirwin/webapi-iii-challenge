const express = require("express");
const userRouter = require("./users/userRouter");
const server = express();

server.use(express.json());
server.use("/api/users", userRouter);
// server.use("/api/posts", postsRouter);
server.use(logger);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`You sent the ${req.method} to ${req.url} at ${req.time}`);
  next();
}

module.exports = server;
