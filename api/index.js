import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'https://tech-crush-qtxn.vercel.app',
    methods: ['GET', 'POST'], // Add other HTTP methods if needed
    credentials: true, // Allow sending cookies
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'], // Add any additional headers you want to expose
};

app.use(cors(corsOptions));

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client')));

// API routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Serve index.html for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO)
    .then(() => console.log('MongoDB is Connected!'))
    .catch(err => console.log(err));
