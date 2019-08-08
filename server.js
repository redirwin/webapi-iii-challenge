const express = require("express");
const userRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");
const server = express();

server.use(express.json());
server.use("/users", userRouter);
// server.use("/posts", postsRouter);
server.use(logger);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `You sent the ${req.method} method to ${req.url} at ${new Date()}.`
  );
  next();
}

server.listen(8000, () => console.log("\nServer listening on port 8000... \n"));

module.exports = server;
