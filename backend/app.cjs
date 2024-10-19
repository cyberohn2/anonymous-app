require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // For managing cookies

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

// Dynamic imports for route handlers

app.post('/create-user', async (req, res, next) => {
    const NewUser = await import('./Routes/NewUser.js');
    NewUser.default(req, res, next);
});

app.post('/verify-user', async (req, res, next) => {
    const VerifyUser = await import('./Routes/VerifyUser.js');
    VerifyUser.default(req, res, next);
});

app.post('/verify-token', async (req, res, next) => {
    const VerifyToken = await import('./Routes/VerifyToken.js');
    VerifyToken.default(req, res, next);
});

app.get('/profile', async (req, res, next) => {
    const GetProfile = await import('./Routes/GetProfile.js');
    GetProfile.default(req, res, next);
});

app.post('/add-message', async (req, res, next) => {
    const AddMessage = await import('./Routes/AddMessage.js');
    AddMessage.default(req, res, next);
});

app.get('/shorten-url', async (req, res) => {
  const longUrl = req.query.url;
     if (!longUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }
    
  try {
    const apiUrl = `https://ulvis.net/API/write/get?url=${longUrl}`;
    const response = await global.fetch(apiUrl);
    const shortenedUrl = await response.json(); // Parse response as JSON
    res.json({ shortenedUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});


// Fallback route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
