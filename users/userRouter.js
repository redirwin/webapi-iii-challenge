const express = require("express");

const router = express.Router();

const Users = require("./userDb");
const Posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(() => {
      res.status(500).json({
        error: "There was a server error while trying to add the new user."
      });
    });
});

// UNABLE TO CREATE A NEW POST... GETTING SERVER ERROR
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  Posts.insert(req.body)
    .then(newPost => {
      res.status(200).json(newPost);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `Server error while creating a new post.` });
    });
});

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
        error: `There was a server error while trying to retrived user with id ${id}.`
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
        error: `Server error while trying to retreive posts of user with id ${id}.`
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(totalRecordsDeleted => {
      res.status(200).json(totalRecordsDeleted);
    })
    .catch(() => {
      res.status(500).json({
        error: `There was a server error while trying to delete user with id ${id}.`
      });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  const update = req.body;

  Users.update(id, update)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(() => {
      res
        .status(200)
        .json({ error: `There was a server error while updating that user.` });
    });
});

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
