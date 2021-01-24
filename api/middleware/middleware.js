const actionsModel = require("../actions/actions-model");
const projectsModel = require("../projects/projects-model");

function validateActionId (req, res, next) {
    const { id } = req.params;

    actionsModel.get(id).then((action) => {
        if (action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ error: "Action not found" });
        }
    });
}

function validateProjectId (req, res, next) {
    const { id } = req.params;

    projectsModel.get(id).then((project) => {
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({ error: "Project not found" });
        }
    });
}

module.exports = { validateActionId, validateProjectId };