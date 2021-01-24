const express = require('express');

const router = express.Router();

const actionsModel = require ("./actions-model");

const { validateActionId } = require("../middleware/middleware");

router.get("/", async (req, res) => {
    try {
        const actions = await actionsModel.get();
        res.status(201).json(actions);
    } catch {
        res.status(500).json({ message: "Problem with the server" });
    }
});

router.get("/:id", validateActionId, async (req, res) => {
    const { id } = req.params;

    try {
        const actions = await actionsModel.get(id);
        res.status(201).json(actions);
    } catch {
        res.status(500).json({ message: "Problem with the server" });
    }
});

router.post("/", async (req, res) => {
    const actions = req.body;
    if (actions) {
        try {
            const newAction = await actionsModel.insert(actions);
            res.status(201).json(newAction);
        } catch {
            res.status(500).json({ message: "Problem with the server" });
        }
    } else {
        res.status(400).json({ message: "Problem with the request" });
    }
});

router.put("/:id", validateActionId, async (req, res) => {
    const project = req.body;
    const { id } = req.params;

    if (!req.body.description || !req.body.notes ) {
        res.status(400).json({ message: "Name, Description, and Notes are required" })
    } else {
        actionsModel.update(id, project)
        .then (action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
        }
})

router.delete ("/:id", validateActionId, async (req, res) => {
    const { id } = req.params;

    try {
        const actions = await actionsModel.remove(id);
        res.status(201).json(actions);
    } catch {
        res.status(500).json({ message: "Problem with the server" });
    }
})

module.exports = router;