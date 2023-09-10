import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/authReducer';

export const LogIn = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const formData = {
      email,
      password,
    };
    dispatch(loginUser(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="userEmail"
          placeholder="Enter your email"
          required
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          name="userPassword"
          min={7}
          placeholder="Enter your password"
          required
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
};
