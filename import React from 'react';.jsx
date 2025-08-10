import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <p>
        Welcome to your dashboard, {user?.username}. This area will be populated
        with application features.
      </p>
    </div>
  );
};

export default DashboardPage;
