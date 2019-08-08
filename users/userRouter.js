const express = require("express");

const router = express.Router();

const Users = require("./userDb");

router.use(express.json());

router.post("/", validateUser, validatePost, (req, res) => {
  res.status(200).json({ message: "Success!" });
});

router.post(
  "/:id/posts",
  validateUserId,
  validateUser,
  validatePost,
  (req, res) => {
    res.status(200).json({ message: "Success to id/posts!" });
  }
);

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

function validateUser(req, res, next) {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  if (req.body.text) {
    next();
  } else {
    res.status(400).json({ message: "missing required text field" });
  }
}

module.exports = router;
