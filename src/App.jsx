// Router
import {
    createRoutesFromElements,
    Route,
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  import {lazy} from "react";
  
  const Index = lazy(() => import("./pages/Index/Index"));
  const Login = lazy(() => import("./pages/Login/Login"));
  const Register = lazy(() => import("./pages/Register/Register"));
  const Profile = lazy(() => import("./pages/Profile/Profile"));
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </>,
    ),
  );
  
  function App() {
    return <RouterProvider router={router} />;
  }
  
  export default App;