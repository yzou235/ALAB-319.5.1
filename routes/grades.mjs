import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from 'mongodb';

const router = express.Router()

// query collection middleware
// this is specifically for this route
router.use( async (req, res, next) => {
    req.grades = await db.collection('grades');
    next();
})

// BASE URL:
// localhost:5050/grades/


// "/grades" routes - interact with single grade entries//

// create a single grade entry
router.post("/", async (req, res) => {
    // let collection = await db.collection('grades');
    let collection = req.grades;
    let newDocument = req.body;

    // rename fields for backwards compatibility
    if (newDocument.hasOwnProperty("student_id")) {
        newDocument.learner_id = newDocument.student_id
        delete newDocument.student_id
    }

    let result = await collection.insertOne(newDocument);
    if (!result) res.send('Bad Request').status(400);
    else res.send(result).status(200);

})

// Get a single grade entry
router.get("/:id", async (req, res) => {
    // let collection = await db.collection('grades');
    let collection = req.grades;
    let query = { _id: new ObjectId(req.params.id) }; // _id is a mongo object id, so need to use ObjectId
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Add a score to a grade entry
router.patch('/:id/add', async(req, res) => {
    // let collection = await db.collection('grades');
    let collection = req.grades;
    let query = { _id: new ObjectId(req.params.id) };

    let result = await collection.updateOne(query, {
        $push: {scores: req.body },
    });

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})

// Remove a score from a grade entry
router.patch('/:id/delete', async(req, res) => {
    let collection = req.grades;
    let query = { _id: new ObjectId(req.params.id) };

    let result = await collection.updateOne(query, {
        $pull: { scores: req.body },
    });

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})

// Delete a single grade entry
router.delete('/:id/delete', async(req, res) => {
    let collection = req.grades;
    let query = { _id: new ObjectId(req.params.id) };

    let result = await collection.deleteOne(query);

    if (!result) res.send("Nor found").status(404);
    else res.send(result).status(200);
});



// "/grades/learner" routes - interact with grades entries based on learner_id //

// backwards compatibility //
//  a system that is backward compatible allows older versions or components to work seamlessly with newer versions without requiring modifications or updates.
router.get("/student/:id", (req, res) => {
    res.redirect(`/learner/${req.params.id}`);
})

// Get a students grade data
router.get("/learner/:id", async (req, res) => {
    // let collection = await db.collection('grades');
    let collection = req.grades;
    let query = { learner_id: Number(req.params.id) }; // turn req.params.id to a number

    let result = await collection.find(query).toArray();

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Delete a students grade data
router.delete("/learner/:id", async (req, res) => {
    let collection = req.grades;
    let query = { learner_id: Number(req.params.id) };

    let result = await collection.deleteOne(query);

    if(!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
});



// "/grades/class" routes - interact with grade entries based on class_id //

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
    // let collection = await db.collection('grades');
    let collection = req.grades;
    let query = { class_id: Number(req.params.id) } // turn req.params.id to a number
    let result = await collection.find(query).toArray();

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Update a class id
router.patch('/class/:id', async (req, res) => {
    let collection = await db.collection('grades');
    let query = { class_id: Number(req.params.id) };

    let result = await collection.updateMany(query, {
        $set: { class_id: req.body.class_id },
    });

    if (!result) res.send('Not found').status(404);
    else res.send(result).status(200);
});


// Delete a learner's grade data
router.delete('/learner/:id', async (req, res) => {
    // let collection = await db.collection('grades');
    let collection = req.grades;
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);

    if(!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
})


export default router