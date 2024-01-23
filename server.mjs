import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5050;
const app = express()

app.use(express.json());

// Connect to Mongoose
const connectionString = process.env.ATLAS_URI;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Connection events
const db = mongoose.connection;

// Event: Connected
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Event: Error
db.on('error', (error) => {
    console.error(`MongoDB connection error: ${error}`);
});

import grades from './routes/grades.mjs';

app.use("/grades", grades);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

