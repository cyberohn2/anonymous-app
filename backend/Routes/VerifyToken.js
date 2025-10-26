import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'; // JWT package for token generation
const JWT_SECRET = process.env.JWT_SECRET; // Store securely (env variable)



const VerifyToken = (req, res) =>{
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
        return res.status(200).json({ message: 'Token is valid', user: decoded });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

export default VerifyToken;
