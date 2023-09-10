import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/authReducer';
import s from './regandlog.module.css';

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
    <form onSubmit={handleSubmit} className={s.form}>
      <h1 className={s.title}>Log in</h1>
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
        Log in
      </button>
    </form>
  );
};
