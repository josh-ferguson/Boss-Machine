const express = require('express');
const ideas = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const { 
    getAllFromDatabase,
    addToDatabase, 
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require("./db");

ideas.use("/:ideaId", (req, res, next) => {
    let ideaId = req.params.ideaId;
    let ideaIndex = getAllFromDatabase("ideas").findIndex(obj => obj.id === ideaId);
    if(ideaIndex !== -1){
        req.ideaId = ideaId;
        next();
    } else {
        res.status(404).send("Idea not found!");
    }
});

ideas.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase("ideas"));
});

ideas.post("/", checkMillionDollarIdea, (req, res, next) => {
    const receivedIdea = req.body;
    if(!receivedIdea){
        res.status(400).send();
    } else {
        addToDatabase("ideas", receivedIdea);
        res.status(201).send(receivedIdea);
    }
});

ideas.get("/:ideaId", (req, res, next) => {
    res.status(200).send(getFromDatabaseById("ideas", req.ideaId))
})

ideas.put("/:ideaId", (req, res, next) => {
    const updatedIdea = req.body;
    if(!updatedIdea){
        res.status(400).send();
    } else {
        updateInstanceInDatabase("ideas", updatedIdea);
        res.status(201).send(updatedIdea);
    }
});

ideas.delete("/:ideaId", (req, res, next) => {
    deleteFromDatabasebyId("ideas", req.ideaId);
    res.status(204).send();
})

module.exports = ideas;