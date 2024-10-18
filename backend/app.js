import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'; // For managing cookies

import NewUser from './Routes/NewUser';
import VerifyUser from './Routes/VerifyUser';
import VerifyToken from './Routes/VerifyToken';
import GetProfile from './Routes/GetProfile';
import AddMessage from './Routes/AddMessage';

dotenv.config(); // Initialize dotenv

const app = express();
const port = process.env.PORT || 3001;


// Middleware
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cookieParser()); // Parse cookies from incoming requests


// MongoDB connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(() => app.listen(port, () => {
        console.log(`Backend server listening on port ${port}`);
    }))
    .catch(err => console.log(err));

// Route to create a new user (already implemented)
app.post('/create-user', NewUser);


// Route to verify user login
app.post('/verify-user', VerifyUser);

app.post('/verify-token', VerifyToken);

app.get('/profile', GetProfile);

app.post('/add-message', AddMessage);

// Fallback route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
