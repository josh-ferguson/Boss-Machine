const express = require('express');
const meetings = express.Router();

const { 
    getAllFromDatabase,
    createMeeting,
    addToDatabase,
    deleteAllFromDatabase
} = require("./db");

meetings.get("/", (req, res, next) => {
    res.status(200).send(getAllFromDatabase("meetings"));
})

meetings.post("/", (req, res, next) => {
    const meetingsRecieved = createMeeting();
    if (!meetingsRecieved) {
        res.status(400).send();
    } else {
        addToDatabase("meetings", meetingsRecieved);
        res.status(201).send(meetingsRecieved);
    }
})

meetings.delete("/", (req, res, next) => {
    deleteAllFromDatabase("meetings");
    res.status(204).send();
})

module.exports = meetings;