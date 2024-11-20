import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './dbConnect.js';
import studentRouter from './routes/studentRoutes.js';
import courseRouter from './routes/courseRoutes.js';

dotenv.config(); // Load environment variables at the very beginning

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/students', studentRouter);
app.use('/courses', courseRouter);

// Connect to database and start server
connectToDB(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error.message);
    });
