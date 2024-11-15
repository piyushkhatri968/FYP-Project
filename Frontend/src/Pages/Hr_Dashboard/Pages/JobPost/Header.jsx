// Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-900 p-6 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Post a Job</h1>
        <a href="/dashboard" className="text-sm text-gray-300 hover:text-white">Dashboard</a>
      </div>
    </header>
  );
};

export default Header;
