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

// const db = mongoose.connection;

import grades from './routes/grades.mjs';

app.use("/grades", grades);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

