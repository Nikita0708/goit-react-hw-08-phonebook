import { SignUp } from 'components/RegAndLog/SignUp';
import { LogIn } from 'components/RegAndLog/LogIn';
import { Contacts } from 'components/Contacts/Contacts';
import { Home } from 'components/Home/Home';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';

export const HOME_ROUTE = '/';
export const CONTACTS_ROUTE = '/contacts';
export const SIGNUP_ROUTE = '/signup';
export const LOGIN_ROUTE = '/login';

export const AppRoutes = [
  {
    path: HOME_ROUTE,
    element: <Home />,
  },
  {
    path: CONTACTS_ROUTE,
    element: (
      <PrivateRoute>
        <Contacts />
      </PrivateRoute>
    ),
  },
  {
    path: SIGNUP_ROUTE,
    element: (
      <RestrictedRoute redirectTo={CONTACTS_ROUTE}>
        <SignUp />
      </RestrictedRoute>
    ),
  },
  {
    path: LOGIN_ROUTE,
    element: (
      <RestrictedRoute redirectTo={CONTACTS_ROUTE}>
        <LogIn />
      </RestrictedRoute>
    ),
  },
];
