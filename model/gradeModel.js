import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    scores:[{
        score_value: Number,
    }],
    class_id: Number,
    learner_id: Number
});

const gradeModel = mongoose.model('Grade', gradeSchema);
export default gradeModel;