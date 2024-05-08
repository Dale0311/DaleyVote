// import the currentUser from store
// create a condition base on that currentUser

import { Navigate, Outlet } from 'react-router-dom';
import { CurrentUser } from '../../types';
import { useCurrentUserStore } from '../../store/store';

// if !currentUser? condition : condition2
const RequiredAuth = () => {
  const currentUser: CurrentUser<string> | object = useCurrentUserStore(
    (state) => state.currentUser
  );

  return (
    <>
      {Object.keys(currentUser).length > 0 ? (
        <Outlet />
      ) : (
        <Navigate to={'/signin'} />
      )}
    </>
  );
};

export default RequiredAuth;
