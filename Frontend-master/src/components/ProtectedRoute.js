import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  // If the user is not logged in, redirect to the home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children (the protected content)
  return children;
};

export default ProtectedRoute;
