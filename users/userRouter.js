const express = require("express");

const router = express.Router();

const Users = require("./userDb");

router.post("/", validateUser, validatePost, (req, res) => {
  res.status(200).json({ message: "Success to /!" });
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

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        error:
          "There was a server error while trying to retrieve the list of users."
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({
        error: `There was a server error while trying to retrived user with id ${id}`
      });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const id = req.params.id;
  Users.getUserPosts(id)
    .then(userPosts => {
      res.status(200).json(userPosts);
    })
    .catch(() => {
      res.status(500).json({
        error: `Server error while trying to retreive posts of user with id ${id}`
      });
    });
});

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
