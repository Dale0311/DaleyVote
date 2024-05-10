// import the currentUser from store
// create a condition base on that currentUser
import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUserStore } from '../../store/store';
import { CurrentUser } from '../../types';

// if !currentUser? condition : condition2
const RequiredAuth = () => {
  const token = useCurrentUserStore((state) => state.token);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  if (token) {
    const decoded: CurrentUser<string> = jwtDecode(token);
    setCurrentUser(decoded);
  }
  return <>{token ? <Outlet /> : <Navigate to={'/signin'} />}</>;
};

export default RequiredAuth;
