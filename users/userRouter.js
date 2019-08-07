const express = require("express");

const router = express.Router();

router.use(validateUserId);

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {
  console.log(req);
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  req.user = req.params.id;
  if (req.user) {
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
}

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
