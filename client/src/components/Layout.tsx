import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className=" w-full sm:w-11/12 lg:w-4/5 sm:mx-auto p-4 space-y-4">
      <nav className="flex justify-between items-center">
        <Link className="w-32" to={'/'}>
          <img src="/logo.png" alt="" className="" />
        </Link>
        <img src="/profile.png" alt="" className="h-12 w-12 rounded-full" />
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
