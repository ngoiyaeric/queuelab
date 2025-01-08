'use client';

import React, { useState } from 'react';

const EmailPopup = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      // Handle email submission
      console.log('Email submitted:', email);
      setEmail('');
      setError('');
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="fixed bottom-0 left-0 m-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Enter your email"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default EmailPopup;
