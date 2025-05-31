import anonymousAppUser from "../Models/user.js";

const AddMessage = async (req, res) =>{
    const { username, message } = req.body;

    try {
      // Find the user by username
      const user = await anonymousAppUser.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Add the message to the user's messages array
      user.messages.push(message);
      await user.save();
  
      res.status(200).json({ success: true, message: 'Message added to user' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Server error' });
    }
}

export default AddMessage;
