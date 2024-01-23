import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // },
    scores:[{
        type: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    }],
    class_id: {
        type: Number,
        required: true,
    },
    learner_id: {
        type: Number,
        required: true,
    }
});

export default mongoose.model('Grade', gradeSchema, "grades");
