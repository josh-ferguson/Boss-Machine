const express = require('express');
const minions = express.Router();

const { 
    getAllFromDatabase, 
    addToDatabase, 
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require("./db");

minions.use("/:minionId", (req, res, next) => {
    let minionId = req.params.minionId;
    let minionIndex = getAllFromDatabase("minions").findIndex(obj => obj.id === minionId);
    if(minionIndex !== -1){
        req.minionId = minionId;
        next();
    } else {
        res.status(404).send("Minon not found!");
    }
});

minions.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase("minions"));
});

minions.post("/", (req, res, next) => {
    const receivedMinion = req.body;
    if(!receivedMinion){
        res.status(400).send();
    } else {
        addToDatabase("minions", receivedMinion);
        res.status(201).send(receivedMinion);
    }
});

minions.get("/:minionId", (req, res, next) => {
    res.status(200).send(getFromDatabaseById("minions", req.minionId))
})

minions.put("/:minionId", (req, res, next) => {
    const updatedMinion = req.body;
    if(!updatedMinion){
        res.status(400).send();
    } else {
        updateInstanceInDatabase("minions", updatedMinion);
        res.status(201).send(updatedMinion);
    }
});

minions.delete("/:minionId", (req, res, next) => {
    deleteFromDatabasebyId("minions", req.minionId);
    res.status(204).send();
})

// BONUS - work
minions.use("/:minionId/work/:workId", (req, res, next) => {
    const workArr = getAllFromDatabase("work");
    const workId = req.params.workId;
    const workIndex = workArr.findIndex(obj => obj.id === workId);
    if(workIndex !== -1){
      req.workIndex = workIndex;
      req.workId = workId;
      next();
    } else {
      res.status(404).send('Work not found!');
    }
})

minions.get('/:minionId/work', (req, res, next) => {
    const workArr = getAllFromDatabase("work");
    const minionsWork = workArr.filter(work => work.minionId === req.minionId)
    res.status(200).send(minionsWork);
});

minions.post("/:minionId/work", (req, res, next) => {
    const receivedWork = req.body;
    if(!receivedWork){
        res.status(400).send();
    } else {
        addToDatabase("work", receivedWork);
        res.status(201).send(receivedWork);
    }
});

minions.put("/:minionId/work/:workId", (req, res, next) => {
    let work = getAllFromDatabase("work");
    if(work[req.workIndex].minionId !== req.minionId){
        res.status(400).send();
    } else {
    updateInstanceInDatabase("work", req.body);
    work = getAllFromDatabase("work");
    res.status(201).send(work[req.workIndex]);
    }
});

minions.delete("/:minionId/work/:workId", (req, res, next) => {
    deleteFromDatabasebyId("work", req.workId);
    res.status(204).send();
})

module.exports = minions;