import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import the context

// Helper function to get the JWT from cookies
const getTokenFromCookies = () => {
  const cookieName = 'jwt'; // Ensure the correct cookie name is used
  const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
  return match ? match[2] : null;
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track authentication status
  const [loading, setLoading] = useState(true); // Loading state to handle async request
  const { setUser } = useContext(UserContext); // Access the global user state

  useEffect(() => {
    const token = getTokenFromCookies();
    console.log(token)

    if (!token) {
      setIsAuthenticated(false); // No token, not authenticated
      setLoading(false);
      return;
    }

    // Send POST request using fetch to verify the token
    fetch('/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }), // Send the token in the request body
      credentials: 'include', // Send cookies with the request if needed
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON response if status is 200
        } else {
          throw new Error('Token verification failed');
        }
      })
      .then((data) => {
        setIsAuthenticated(true); // Token is valid

        // Fetch user data from the backend if token is valid
        return fetch('/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the headers
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
      })
      .then((response) => response.json())
      .then((userData) => {
        // Save user data in the global context
        setUser(userData);
      })
      .catch((error) => {
        console.error('Token or user data fetch failed:', error);
        setIsAuthenticated(false); // Handle error, assume not authenticated
      })
      .finally(() => {
        setLoading(false); // End loading state
      });
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking token
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/" />;
  }

  // If authenticated, render the protected route's content
  return children;
};

export default ProtectedRoute;
