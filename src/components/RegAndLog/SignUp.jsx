import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/authReducer';

export const SignUp = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.userName.value;
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const formData = {
      name,
      email,
      password,
    };
    dispatch(registerUser(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <label>
        <span>Name</span>
        <input
          type="text"
          name="userName"
          placeholder="Enter your name"
          required
        />
      </label>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};
