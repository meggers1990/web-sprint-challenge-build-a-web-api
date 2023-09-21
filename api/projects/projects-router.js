// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");

const { validateProjId, validateProj } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "No data" });
    });
});

router.get("/:id", validateProjId, (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Project not found",
      });
    });
});

router.post("/", validateProj, (req, res) => {
  const newPost = req.body;
  Projects.insert(newPost)
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
  Projects.update(req.params.id, req.body)
    .then((updatedPost) => {
      res.status(201).json(updatedPost);
    })
    .catch((err) =>
      res.status(500).json({
        message: "Error",
      })
    );
});

router.delete("/:id", validateProjId, (req, res) => {
  Projects.remove(req.params.id)
    .then((removedPost) => res.status(200).json(removedPost))
    .catch((err) =>
      res.status(500).json({
        message: err.message,
      })
    );
});

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((proj) => {
      res.status(200).json(proj);
    })
    .catch(res.status(500));
});

module.exports = router;