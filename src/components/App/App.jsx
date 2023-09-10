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
      {authenticated ? (
        <>
          <h1>Contacts App</h1>
          <p>Hello, {userData.name}</p>
          <button onClick={handleLogOut}>Log out</button>
          <Link to="/contacts">Phonebook</Link>
        </>
      ) : (
        <nav>
          <h1>You must be signed in to use this app</h1>
          <Link to="/login">LogIn</Link>
          <Link to="/signup">SignUp</Link>
        </nav>
      )}
      <Routes>
        {AppRoutes.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
