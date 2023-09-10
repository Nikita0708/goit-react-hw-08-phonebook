import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/authReducer';
import s from './regandlog.module.css';
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
    <form onSubmit={handleSubmit} className={s.form}>
      <h1 className={s.title}>Sign Up</h1>
      <label className={s.label}>
        <span className={s.text}>Name</span>
        <input
          type="text"
          name="userName"
          placeholder="Enter your name"
          className={s.input}
          required
        />
      </label>
      <label className={s.label}>
        <span className={s.text}>Email</span>
        <input
          type="email"
          name="userEmail"
          placeholder="Enter your email"
          className={s.input}
          required
        />
      </label>
      <label className={s.label}>
        <span className={s.text}>Password</span>
        <input
          type="password"
          name="userPassword"
          min={7}
          placeholder="Enter your password"
          className={s.input}
          required
        />
      </label>
      <button type="submit" className={s.btn}>
        Sign Up
      </button>
    </form>
  );
};
