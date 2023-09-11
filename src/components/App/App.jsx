import { Home } from 'components/Home/Home';
import { Route, Routes, Link } from 'react-router-dom';
import { AppRoutes } from 'components/constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  logoutUser,
  refreshUser,
  selectUserAuthentication,
  selectUserData,
} from 'redux/authReducer';
import { useEffect } from 'react';

import s from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectUserAuthentication);
  const userData = useSelector(selectUserData);
  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    <>
      <header className={s.header}>
        {authenticated ? (
          <>
            <div className={s.top_wrap}>
              <p className={s.greeting_text}>
                Hello, <b>{userData.name}</b>{' '}
              </p>
              <button onClick={handleLogOut} className={s.logout}>
                Log out
              </button>
            </div>
            <div>
              <Link to="/contacts" className={s.contacts_link}>
                Phonebook
              </Link>
              <Link to="/" className={s.contacts_link}>
                Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className={s.title}>Firstly, log in {'-->'} </h1>
            <nav className={s.nav}>
              <Link to="/login" className={s.nav_link}>
                LogIn
              </Link>
              <Link to="/signup" className={s.nav_link}>
                Sign Up
              </Link>
            </nav>
          </>
        )}
      </header>
      <Routes>
        {AppRoutes.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
