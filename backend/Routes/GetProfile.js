require('dotenv').config();
const jwt = require('jsonwebtoken'); // JWT package for token generation
const JWT_SECRET = process.env.JWT_SECRET; // Store securely (env variable)
const anonymousAppUser = require("../Models/user");

const GetProfile = async (req, res) =>{
     // Extract the JWT from cookies
     const token = req.cookies.jwt;

     if (!token) {
         return res.status(401).json({ message: 'No token provided' });
     }
 
     try {
         // Verify the token
         const decoded = jwt.verify(token, JWT_SECRET);
 
         // Fetch the user from the database
         const user = await anonymousAppUser.findById(decoded.id); // Use async/await instead of callback
 
         if (!user) {
             return res.status(404).json({ message: 'User not found' });
         }
 
         // Send user data (exclude sensitive info like password)
         res.status(200).json({
             id: user._id,
             username: user.username,
             email: user.email,
             messages: user.messages, // If the user has any additional messages
         });
     } catch (err) {
         console.error('Error fetching profile:', err);
         return res.status(403).json({ message: 'Invalid token' });
     }
}

module.exports = GetProfile;