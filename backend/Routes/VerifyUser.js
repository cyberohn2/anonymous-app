import dotenv from 'dotenv';
dotenv.config();
const jwt = require('jsonwebtoken'); // JWT package for token generation
const bcrypt = require('bcrypt'); // bcrypt for password hashing
const JWT_SECRET = process.env.JWT_SECRET; // Store securely (env variable)
import anonymousAppUser from "../Models/user";

const VerifyUser = async (req, res) =>{
    const { username, password } = req.body;
  
    try {
      const user = await anonymousAppUser.findOne({ username });
      if (!user) {
          console.log("no user")
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("wrong password")
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  
      // Set the cookie with the JWT
      res.cookie('jwt', token, {
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict', // Protect against CSRF
        maxAge: 3600000, // 1 hour
      });
  
      // Respond with user data (without password)
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        messages: user.messages,
      });
      console.log("successfull ")
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
}

module.exports = VerifyUser;