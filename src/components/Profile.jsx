import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { UserContext } from './UserContext';
import femaleUserImage from '/female-user-img.png';
import maleUserImage from '/male-user-img.png';
import clipboardIcon from '/clipboard-icon.svg';
import fbIcon from '/fb-icon.svg';
import igIcon from '/ig-icon.svg';
import mailIcon from '/mail-icon.svg';
import xIcon from '/x-icon.svg';
import MessageItem from './MessageItem';

const Profile = () => {
  const { user, setUser } = useContext(UserContext); // Access user data and setUser from context
  const navigate = useNavigate(); // Initialize navigation hook
  const [shortenedLink, setShortenedLink] = useState('');
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <div >Loading user data...</div>;
  }

  const { username = "Unknown", email = "", messages = [] } = user;
  const userGender = "male"; // Default gender
  const userProfileLink = `${window.location.origin}/message?user=${username}`;
  
// Function to shorten the URL using the spoo.me API with fetch
const shortenProfileLink = async (url) => {
  const apiUrl = 'https://spoo.me/';
  const data = new URLSearchParams();
  data.append('url', url); // Add the URL to be shortened

  try {
    const response = await fetch(apiUrl, {
      method: 'POST', // POST method to send data
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Use URL-encoded form data
        'Accept': 'application/json', // Expect JSON response
      },
      body: data.toString(), // Send the URL-encoded form data
    });

    if (response.ok) {
      const result = await response.json(); // Parse the response as JSON
      console.log('Shortened URL:', result);
      return result; // Return the shortened URL from the response
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error shortening the URL:', error);
    return url; // Return the original URL in case of an error
  }
};



// UseEffect to generate and shorten the userProfileLink on component mount
useEffect(() => {
  const fetchShortenedLink = async () => {
    setLoading(true);
    const shortLink = await shortenProfileLink(userProfileLink); // Pass the user profile link to the updated function
    console.log(shortLink);
    setShortenedLink(shortLink); // Set the shortened link in state
    setLoading(false);
  };

  fetchShortenedLink();
}, [userProfileLink]);


  // Handle logout function
  const handleLogout = () => {
    // Clear the "jwt" cookie by setting it to a past date
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Clear the user context
    setUser(null);

    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="py-10 relative isolate px-4 lg:px-10 text-near-white">
      <div className='w-[200px] h-[200px] mx-auto rounded-full bg-[#4c4b4b] border border-gray-500 bg-no-repeat bg-center' style={{ backgroundImage: `url(${userGender === "male" ? maleUserImage : femaleUserImage})`, backgroundSize: "105%", backgroundPositionY: "-20%" }}></div>
      <h1 className='text-center mt-6 font-Inter text-2xl'>Welcome, <span className='text-gradient font-Salsa'>{username}</span></h1>
      
      <div className='flex items-center w-fit justify-center mx-auto mt-2'>
        {loading ? (
          <p className='bg-gray-700 rounded-lg p-1 px-2 font-bold text-[.75rem] mr-2'>Shortening URL...</p>
        ) : (
          <>
            <p className='bg-gray-700 rounded-lg p-1 px-2 font-bold text-[.75rem] mr-2'>{shortenedLink}</p>
            <img className='p-2 bg-gray-500 rounded-md w-[26px] h-[26px] cursor-pointer' src={clipboardIcon} alt="clipboard icon" />
          </>
        )}
      </div>

      <div className='mt-4'>
        <h2 className='font-Inter font-bold'>Share Your Link:</h2>
        <ul className='flex gap-2'>
          <li><a target='_blank' href="https://facebook.com"><img className='p-2 bg-gray-500 rounded-md w-[26px] h-[26px]' src={fbIcon} alt="facebook icon" /></a></li>
          <li><a target='_blank' href="https://facebook.com"><img className='p-2 bg-gray-500 rounded-md w-[26px] h-[26px]' src={igIcon} alt="instagram icon" /></a></li>
          <li><a target='_blank' href="https://facebook.com"><img className='p-2 bg-gray-500 rounded-md w-[26px] h-[26px]' src={xIcon} alt="x/twitter icon" /></a></li>
          <li><a target='_blank' href="https://facebook.com"><img className='p-2 bg-gray-500 rounded-md w-[26px] h-[26px]' src={mailIcon} alt="mail icon" /></a></li>
        </ul>
      </div>

      <div className='mt-8'>
        <h2 className='font-Inter text-2xl mb-2'>Messages</h2>
        <ul>
          {messages.length > 0
            ? messages.map((message, index) => <MessageItem message={message} key={index} />)
            : <p>No messages yet.</p>}
        </ul>
      </div>

      <button
        onClick={handleLogout} // Attach the logout handler to the button
        className="bg-near-white py-2 px-4 mt-4 rounded-full font-semibold text-center text-black block mx-auto hover:bg-white hover:scale-110 transition-transform">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
