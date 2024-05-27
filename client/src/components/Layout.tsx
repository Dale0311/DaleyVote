import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" w-full sm:w-11/12 lg:w-4/5 sm:mx-auto p-4 space-y-4">
      <nav className="flex justify-between items-center">
        <div className="w-32">
          <img src="/logo.png" alt="" className="" />
        </div>
        <img src="/profile.png" alt="" className="h-12 w-12 rounded-full" />
      </nav>
      <Link
        to={"rooms/2c8b139f-bb15-460c-ae15-ab0caa6f64ef"}
        className="px-6 py-2 rounded text-white bg-blue-500"
      >
        Test
      </Link>
      <Outlet />
    </div>
  );
};

export default Layout;
