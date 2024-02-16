import Nav from "./components/Nav";
import Auth from "./pages/Auth";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  useNavigate,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import Links from "./pages/Links";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import useUser from "./hooks/useUser";

const ProtectedRoute = () => {
  const currentUser = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to the authentication page if no current user
    if (!currentUser || currentUser === null) {
      return navigate("/signin", { replace: true });
    }
    // Normalize the pathname
    const normalizedPathname = location.pathname.replace(/\/$/, ""); // Remove trailing slash if present

    // Check if we are in /register or /auth route
    if (normalizedPathname === "/signin") {
      // Check if currentUser is not null
      if (currentUser !== null) {
        // Redirect to home page if currentUser is not null and we are in /register or /auth route
        navigate("/links", { replace: true });
      }
    }
  }, [currentUser, location.pathname, navigate]);

  return <Outlet />;
};

function App() {
  return (
    <>
      {/* <Nav /> */}

      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/signin" element={<Auth />}></Route>
          <Route path="/links" element={<Links />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
