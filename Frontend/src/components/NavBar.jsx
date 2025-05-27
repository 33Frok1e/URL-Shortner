import React from 'react';
import { Link } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, logoutUser } from '../api/user.api';

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Fetch current user data
  const { data: userData, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    enabled: true // This ensures the query runs when component mounts
  });

  const onLogout = async () => {
    try {
      await logoutUser();
      // Clear all queries from cache
      queryClient.clear();
      // Reset the current user query
      queryClient.setQueryData(['currentUser'], null);
      // Force refetch to update UI
      await refetch();
      // Navigate to auth page
      navigate({ to: '/auth' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white border border-b-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Shorting
            </Link>
          </div>
          
          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {userData?.user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {userData.user.name}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;