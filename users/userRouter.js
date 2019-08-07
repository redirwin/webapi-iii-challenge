const express = require("express");

const router = express.Router();

const Users = require("./userDb");

router.post("/", (req, res) => {});

router.post("/:id/posts", validateUserId, (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getById(id).then(result => {
    if (result) {
      req.user = result;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  });
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
