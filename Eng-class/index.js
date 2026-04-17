import express from 'express';
import mongoConnection from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

/* ---------------- CORS CONFIG ---------------- */
app.use(cors({
    origin: [
        'https://sc-frontend-one.vercel.app',
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    credentials: true
}));

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------------- DATABASE ---------------- */
mongoConnection();

/* ---------------- TEST ROUTE ---------------- */
app.get("/test", (req, res) => {
    res.send("hello world");
});

/* ---------------- ROUTES ---------------- */
app.use('/auth', userRoutes);
app.use('/post', postRoutes);
app.use('/uploads', express.static('uploads'));

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("🚀 Server running on port " + PORT);
});