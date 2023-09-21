// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateProjId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "action with that ID does not exist",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Trouble finding action",
    });
  }
}

function validateProj(req, res, next) {
  const { notes, description, project_id, completed } = req.body;
  if (!notes || !description || !project_id || completed === undefined) {
    res.status(400).json({
      message: "Please add notes and description",
    });
  } else {
    next();
  }
}

module.exports = {
  validateProjId,
  validateProj,
};