// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");

const { validateProj, validateProjId } = require("./actions-middlware");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "No data" });
    });
});

router.get("/:id", validateProjId, (req, res) => {
  Actions.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Action not found",
      });
    });
});

router.post("/", validateProj, (req, res) => {
  const newPost = req.body;
  Actions.insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) =>
      res.status(500).json({
        message: "no post found",
      })
    );
});

router.put("/:id", validateProj, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((updatedPost) => {
      res.status(201).json(updatedPost);
    })
    .catch((err) =>
      res.status(500).json({
        message: "Error",
      })
    );
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then((removedPost) => res.status(200).json(removedPost))
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
});

module.exports = router;