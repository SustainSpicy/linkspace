import Auth from "./pages/Auth";
import {
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import useUser from "./hooks/useUser";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Links from "./pages/Links";
import { useAlertContext } from "./provider/AlertProvider";
import AlertBar from "./components/AlertBar";
import Email_verification from "./pages/Email_verification";

const ProtectedRoute = () => {
  const currentUser = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { showAlert } = useAlertContext();
  useEffect(() => {
    // Normalize the pathname
    const normalizedPathname = location.pathname.replace(/\/$/, ""); // Remove trailing slash if present
    // Automatically navigate to the authentication page if no current user
    if (
      (!currentUser || currentUser === null) &&
      normalizedPathname !== "/auth"
    ) {
      showAlert({ text: "Your session expired", type: "danger" });
      return navigate("/", { replace: true });
    }

    // Check if currentUser is not null
    if (currentUser !== null) {
      // Email_verification
      // if (
      //   !currentUser.emailVerification.verified &&
      //   normalizedPathname !== "/verify"
      // ) {
      //   return navigate("/verify", { replace: true });
      // }
      // Check if we are in /register or /auth route
      if (normalizedPathname === "/auth") {
        // Redirect to home page if currentUser is not null and we are in /register or /auth route
        return navigate("/links", { replace: true });
      }
    }
  }, [currentUser, location.pathname, navigate]);

  return <Outlet />;
};

function App() {
  const { alert } = useAlertContext();

  return (
    <>
      <Nav />
      {/* <main className="relative flex flex-col justify-center items-center"> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/verify" element={<Email_verification />}></Route>
          {/* <Route path="/verify/:token" element={<Email_verification />} /> */}
          <Route path="/auth" element={<Auth />}></Route>
          {/* <Route path="/links" element={<Test />}></Route> */}
          <Route path="/links" element={<Links />}></Route>
        </Route>
      </Routes>
      {alert.show && <AlertBar {...alert} />}
      {/* </main> */}
    </>
  );
}

export default App;
