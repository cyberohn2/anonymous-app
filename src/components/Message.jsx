import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Home from './Home';

const Message = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [text1, setText1] = useState("");
  const [textIndex1, setTextIndex1] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const PHoptions1 = ["message", "confession", "question", "opinion"];

  // Get username from URL parameter
  const username = searchParams.get("user");

  useEffect(() => {
    // Redirect to home if no "user" param is present
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  // Typing effect logic
  useEffect(() => {
    let typingSpeed = isDeleting ? 75 : 150;
    const handleTyping = setTimeout(() => {
      const currentText = PHoptions1[textIndex1];
      setText1(
        isDeleting
          ? currentText.substring(0, text1.length - 1)
          : currentText.substring(0, text1.length + 1)
      );

      if (!isDeleting && text1 === currentText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text1 === "") {
        setIsDeleting(false);
        setTextIndex1((prevIndex) => (prevIndex + 1) % PHoptions1.length);
      }
    }, typingSpeed);

    return () => clearTimeout(handleTyping);
  }, [text1, isDeleting, textIndex1, PHoptions1]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/add-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // Send the username from URL
          message, // The message typed in textarea
        }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setMessage(""); // Clear textarea after success
      } else {
        alert("Error sending message!");
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  return (
    <div className='px-4 lg:px-10 '>
      <h1 className='text-center mt-6 font-Inter text-2xl mb-2 text-near-white'>
        Send an anonymous<br />
        <span className="font-Salsa typewriter" style={{ display: "inline" }}>
          {text1}
        </span> 
        to, <span className='text-gradient font-Salsa'>{username}</span>
      </h1>

      <form onSubmit={handleSubmit} className='mb-4 text-near-white'>
        <label className='text-sm font-bold' htmlFor="message">
          Type Your message below:
        </label>
        <textarea
          placeholder={`A secret message to ${username}`}
          className='rounded-lg p-3 bg-[#4c4b4b] border border-gray-500 mb-2 w-full'
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update message state
          cols="30"
          rows="5"
        ></textarea>

        <button
          type="submit"
          className="w-full py-2 bg-gradient text-white rounded-full font-semibold hover:bg-white hover:text-gradient"
        >
          Send
        </button>
      </form>

      <Home />
    </div>
  );
};

export default Message;
