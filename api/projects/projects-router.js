const express = require ("express");

const router = express.Router();

const projectsModel = require("./projects-model");

const { validateProjectId } = require("../middleware/middleware");

router.get("/", async (req, res) => {
    try {
        const projects = await projectsModel.get();
        res.status(201).json(projects)
    } catch {
        res.status(500).json({ message: "Problem with the server" })
    }
});

router.get("/:id", validateProjectId, async (req, res) => {
    const { id } = req.params;
    
})