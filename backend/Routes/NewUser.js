import bcrypt from 'bcrypt';
import anonymousAppUser from "../Models/user";


const NewUser = async (req, res) =>{
    const { email, username, password } = req.body;

    try {
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new anonymousAppUser({
            email: email || '',  // Email is optional
            username: username,
            password: hashedPassword,  // Store the hashed password
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log("User created:", savedUser);

        // Clear existing JWT cookie
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensure this is only done in HTTPS in production
            sameSite: 'strict'
        });

        // Respond with the newly created user data
        res.status(201).json(savedUser);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create user" });
    }
}

module.exports = NewUser;