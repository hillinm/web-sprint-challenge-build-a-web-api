const express = require ("express");

const router = express.Router();

const projectsModel = require("./projects-model");

const { validateProjectId } = require("../middleware/middleware");

router.get("/", async (req, res) => {
    try {
        const projects = await projectsModel.get();
        res.status(201).json(projects);
    } catch {
        res.status(500).json({ message: "Problem with the server" });
    }
});

router.get("/:id", validateProjectId, async (req, res) => {
    const { id } = req.params;
    try {
        const actions = await projectsModel.get(id);
        res.status(201).json(actions);
    } catch {
        res.status(500).json({ message: "Problem with the server" });
    }
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
    const { id } = req.params;

    try {
        const actions = await projectsModel.getProjectActions(id);
        res.status(201).json(actions);
    } catch {
        res.status(500).json({ message: "Problem with the server" });
    }
})

router.post ("/", async (req, res) => {
    const newProject = req.body;

    if (!req.body.description || !req.body.notes) {
        res.status(400).json({ message: "Name, Description, and Notes are required" });
    } else {
        projectsModel.insert(newProject)
        .then(() => {
            res.status(201).json({ newProject });
        })
        .catch(() => {
            res.status(500).json({ message: "Problem with the server" });
        })
    }
})

router.put("/:id", validateProjectId, async (req, res) => {
    const project = req.body;
    const { id } = req.params;

    if (!req.body.description || !req.body.notes ) {
        res.status(400).json({ message: "Name, Description, and Notes are required" })
    } else {
        projectsModel.update(id, project)
        .then (action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
        }
})

router.delete ("/:id", validateProjectId, async (req, res) => {
    const { id } = req.params;

    try {
        const actions = await projectsModel.remove(id);
        res.status(201).json(actions);
    } catch {
        res.status(500).json({ message: "Problem with the server" });
    }
})

module.exports = router;