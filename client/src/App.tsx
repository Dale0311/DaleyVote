import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import RequiredAuth from "./components/auth/RequiredAuth";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Room from "./pages/Room";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <RequiredAuth />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                index: true,
                element: <Home />,
              },
              {
                path: "create",
                element: <CreateRoom />,
              },
              {
                path: "rooms/:code",
                element: <Room />,
              },
            ],
          },
        ],
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
