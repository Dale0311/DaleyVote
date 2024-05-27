import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUserStore } from "../../store/currentUserSlice";
import { CurrentUser } from "../../types";

// if !currentUser? condition : condition2
const RequiredAuth = () => {
  // for test
  // const token1 = 'test';

  // return <>{token1 ? <Outlet /> : <Navigate to={'/signin'} />}</>;

  // for production
  const token = useCurrentUserStore((state) => state.token);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);

  if (token) {
    const decoded: CurrentUser<string> = jwtDecode(token);
    setCurrentUser(decoded);
  }
  return <>{token ? <Outlet /> : <Navigate to={"/signin"} />}</>;
};

export default RequiredAuth;
