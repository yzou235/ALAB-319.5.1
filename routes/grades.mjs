import express from "express";
// import db from "../db/conn.mjs";
// import { ObjectId } from 'mongodb';
import Grade from "../model/gradeModel.mjs";

const router = express.Router()

// query collection middleware
// this is specifically for this route
// router.use( async (req, res, next) => {
//     req.grades = await db.collection('grades');
//     next();
// })

// BASE URL:
// localhost:5050/grades/

// "/grades" routes - interact with single grade entries//

// create a single grade entry
router.post("/", async(req, res) => {
    try {
        const newDoc = new Grade(req.body);
        const result = await newDoc.save();
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
});

// Get a single grade entry
router.get("/:id", async(req, res) => {
    let result = await Grade.findById(req.params.id);

    if (!result) res.status(404).send('Not found');
    else res.status(200).send(result);
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
    let query = { _id: req.params.id };
    let result = await Grade.updateOne(query, {
        $push: {scores: req.body},
    });
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})

// Remove a score from a grade entry
router.patch('/:id/delete', async(req, res) => {
    let query = { _id: req.params.id };
    let result = await Grade.updateOne(query, {
        $pull: { scores: req.body },
    });

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})

// Delete a single grade entry
router.delete('/:id/delete', async(req, res) => {
    let query = { _id: req.params.id };
    let result = await Grade.deleteOne(query);

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
    let query = { learner_id: Number(req.params.id) };
    let result = await Grade.find(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Delete a students grade data
router.delete("/learner/:id", async (req, res) => {
    let query = { learner_id: Number(req.params.id) };
    let result = await Grade.deleteOne(query);

    if(!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
});



// "/grades/class" routes - interact with grade entries based on class_id //

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
    // let collection = await db.collection('grades');
    let query = { class_id: Number(req.params.id) };
    let result = await Grade.find(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Update a class id
router.patch('/class/:id', async (req, res) => {
    let query = { class_id: Number(req.params.id) };
    let result = await Grade.updateMany(query, {
        $set: { class_id: req.body.class_id },
    });

    if (!result) res.send('Not found').status(404);
    else res.send(result).status(200);
});


// Delete a learner's grade data
router.delete('/learner/:id', async (req, res) => {
    let query = { _id: req.params.id };
    let result = await Grade.deleteOne(query);

    if(!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
})


export default router