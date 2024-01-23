import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
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

const gradeModel = mongoose.model('Grade', gradeSchema);
export default gradeModel;