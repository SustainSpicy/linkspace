import GoogleAuth from "./components/GoogleAuth";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useGoogleAuth } from "./provider/GoogleAuthProvider";

function App() {
  const { logout } = useGoogleAuth();

  return (
    <>
      <Signup />
      <GoogleAuth />
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
      <Login />
    </>
  );
}

export default App;
