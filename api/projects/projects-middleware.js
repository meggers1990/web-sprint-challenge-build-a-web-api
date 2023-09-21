// add middlewares here related to projects
const Projects = require("./projects-model");

async function validateProjId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project with that ID does not exist",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Trouble finding project",
    });
  }
}

function validateProj(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    res.status(400).json({
      message: "Please add name and description",
    });
  } else {
    next();
  }
}

module.exports = {
  validateProjId,
  validateProj,
};