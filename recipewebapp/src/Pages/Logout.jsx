import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true });
        navigate('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default Logout;
