import { useState } from "react";
import CardWrapper from "../components/CardWrapper";
import GoogleAuth from "../components/GoogleAuth";
import Login from "../components/Login";
import Signup from "../components/Signup";
// import { useGoogleAuth } from "./provider/GoogleAuthProvider";
import { motion, AnimatePresence } from "framer-motion";

interface AuthFormProps {
  type: number;
}
const Auth = () => {
  // const { logout } = useGoogleAuth();
  const [authType, setAuthType] = useState(1);

  const AuthForm = ({ type }: AuthFormProps) => {
    return (
      <AnimatePresence>
        {type === 0 ? (
          <Signup key="signup" {...{ setAuthType }} />
        ) : (
          <Login key="login" />
        )}
        <span className="text-gray-600 text-sm">
          {type === 0 ? "Already have an account? " : "Don't have an account? "}

          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setAuthType(type === 0 ? 1 : 0)}
          >
            {type === 0 ? "Login " : "Register"}
          </span>
        </span>
      </AnimatePresence>
    );
  };
  return (
    <div className="flex flex-col justify-center">
      <CardWrapper className={"p-4"}>
        <AuthForm type={authType} />
      </CardWrapper>
      <div className="socialAuth pt-8 w-full flex justify-center gap-2">
        <GoogleAuth />
      </div>
      {/* <button type="button" onClick={() => logout()}>
      Logout
    </button> */}
    </div>
  );
};

export default Auth;
