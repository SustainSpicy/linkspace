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
        {type === 0 ? <Signup /> : type === 1 ? <Login /> : <></>}
        <span className="text-gray-600 text-sm">
          {type === 0 ? "Already have an account? " : "Don't have an account? "}

          <a
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setAuthType(type === 0 ? 1 : 0)}
          >
            Register
          </a>
        </span>
      </AnimatePresence>
    );
  };
  return (
    <motion.div layout>
      <CardWrapper>
        <AuthForm type={authType} />
      </CardWrapper>
      <div className="socialAuth pt-8 w-full flex justify-center gap-2">
        <GoogleAuth />
      </div>
      {/* <button type="button" onClick={() => logout()}>
      Logout
    </button> */}
    </motion.div>
  );
};

export default Auth;
