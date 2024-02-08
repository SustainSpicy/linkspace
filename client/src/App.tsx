import Nav from "./components/Nav";
import Auth from "./pages/Auth";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  useNavigate,
  Navigate,
  Outlet,
} from "react-router-dom";
import Links from "./pages/Links";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: any) => {
  const currentUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate to the authentication page if no current user
    if (!currentUser || currentUser === null) {
      return navigate("/signin", { replace: true });
    }
  }, [currentUser, navigate]);
  return <Outlet />;
};

function App() {
  return (
    <Router>
      {/* <Nav /> */}

      <Routes>
        <Route path="/signin" element={<Auth />}></Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="links" element={<Links />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
