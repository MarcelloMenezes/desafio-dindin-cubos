import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { UpdateContextProvider } from '../contexts/UpdateContext';
import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp'

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
  return (
    <UpdateContextProvider>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<ProtectedRoutes redirectTo="/" />}>
          <Route path='/main' element={<Main />} />
        </Route>
      </Routes>
    </UpdateContextProvider>
  );
}

export default MainRoutes;