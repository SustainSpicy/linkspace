import { useEffect, useState } from "react";
import CardWrapper from "../components/CardWrapper";
import GoogleAuth from "../components/GoogleAuth";
import Login from "../components/Login";
import Signup from "../components/Signup";
// import { useGoogleAuth } from "./provider/GoogleAuthProvider";
import { AnimatePresence } from "framer-motion";
import { useAlertContext } from "../provider/AlertProvider";

interface AuthFormProps {
  type: number;
  setAuthType: React.Dispatch<React.SetStateAction<number>>;
}

const AuthForm = ({ type, setAuthType }: AuthFormProps) => {
  const switchText =
    type === 0 ? "Already have an account? " : "Don't have an account?";

  const swapActionText = type === 0 ? "Login " : "Register";
  return (
    <AnimatePresence>
      {type === 0 ? (
        <Signup key="signup" {...{ setAuthType }} />
      ) : (
        <Login key="login" />
      )}
      <span className="text-gray-600 text-sm">
        {switchText}

        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => setAuthType(type === 0 ? 1 : 0)}
        >
          {swapActionText}
        </span>
      </span>
    </AnimatePresence>
  );
};
const Auth = () => {
  const [authType, setAuthType] = useState(1);
  const { alert } = useAlertContext();

  return (
    <div className="w-full bg-background relative flex flex-col items-center justify-center">
      <CardWrapper className={"p-4 bg-primary "}>
        {AuthForm({ type: authType, setAuthType })}
      </CardWrapper>
      <div className="socialAuth pt-8 w-full flex justify-center gap-2">
        <GoogleAuth />
      </div>

      {/* {alert.show && <AlertBar {...alert} />} */}
    </div>
  );
};

export default Auth;
