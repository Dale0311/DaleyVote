// import the currentUser from store
// create a condition base on that currentUser

import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUserStore } from '../../store/store';

// if !currentUser? condition : condition2
const RequiredAuth = () => {
  const token = useCurrentUserStore((state) => state.token);
  return <>{token ? <Outlet /> : <Navigate to={'/signin'} />}</>;
};

export default RequiredAuth;
