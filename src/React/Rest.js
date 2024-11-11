import React, { useState } from 'react';
import axios from 'axios';
import keyIcon from '../Pics/Password.png';

const Rest = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Extract token from URL query params
  const token = new URLSearchParams(window.location.search).get('token');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`https://test-5-p6sv.onrender.com`, { 
        newPassword: password, 
        confirmPassword 
      });
      if (response.status === 200) {
        alert("Password reset successfully!");
      }
    } catch (error) {
      console.error("Error resetting password:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "An error occurred while resetting the password.");
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="title">Reset Password</h2>
      <div className="input-group">
        <img src={keyIcon} alt="Key Icon" className="key-icon" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter New Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="show-password" onClick={togglePasswordVisibility}>👁</button>
      </div>
      <div className="input-group">
        <img src={keyIcon} alt="Key Icon" className="key-icon" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="show-password" onClick={togglePasswordVisibility}>👁</button>
      </div>
      <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      <p>This link will expire in 10 minutes.</p>
    </div>
  );
};

export default Rest;
