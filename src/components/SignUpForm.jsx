import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      password,
      email,
    };

    fetch('/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',  // Include credentials for cookies
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
        return response.json();
      })
      .then((data) => {
        // Clear JWT from cookies by making a request to clear it
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        setMessage("Profile created successfully!, Now login");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error creating user. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-semibold mb-4">{!loading ? 'Create Profile' : 'Creating Profile...'}</h2>

        {message && (
          <div className={`mb-4 text-center font-semibold ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </div>
        )}

        {!loading && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Email (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <button className="w-full py-2 bg-gradient text-white rounded-full font-semibold hover:bg-white hover:text-gradient">
              Create Profile
            </button>
          </form>
        )}

        <button
          onClick={() => navigate(-1)}
          className="block mt-4 text-center w-full text-sm text-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
