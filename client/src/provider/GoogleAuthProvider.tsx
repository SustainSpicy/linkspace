import React, { ReactNode, createContext, useContext, useState } from "react";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import { PrivateApi, PublicApi } from "../api";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../redux/slice/userSlice";
import { useAlertContext } from "./AlertProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../constant";

interface GoogleAuthProviderProps {
  children: ReactNode;
}
const GoogleAuthContext = createContext({
  clientId: "",
  loading: false,
  handleLoginSuccess: (_credentialResponse: CredentialResponse) => {},
  logoutUser: () => {},
});

const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({
  children,
}) => {
  const { showAlert } = useAlertContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const clientId = import.meta.env.VITE_CLIENT_ID;

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    // Send the credential to the backend
    setLoading(true);
    await sendCredentialToBackend(credentialResponse.credential);
    setLoading(false);
  };

  const sendVerifyLink = async () => {
    try {
      const { status } = await PrivateApi.get("/auth/send-verification-email");

      if (status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      // console.log(error);
    }
  };
  const handleLoggin = async (valid: boolean) => {
    const { from } = location.state || { from: PATHS.LINKS };

    if (valid) {
      return navigate(from);
    } else {
      const isVerify = await sendVerifyLink();
      if (isVerify) {
        navigate(from);
      }
    }
  };

  const sendCredentialToBackend = async (credential: string | undefined) => {
    if (credential) {
      try {
        const { status, data } = await PublicApi.post(
          "http://localhost:5000/auth/google",
          {
            credential: credential,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (status === 200 || status === 201) {
          const { msg, ...userData } = data;

          dispatch(setUser(userData));
          showAlert({ text: "User Authenticated", type: "success" });
          handleLoggin(userData.emailVerification.valid);
        }
      } catch (error) {
        showAlert({
          text: "Authentication Error, please try again",
          type: "danger",
        });
        console.error("Error sending credential to backend:", error);
      }
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    googleLogout();
  };

  const sharedData = {
    loading,
    clientId,
    logoutUser,
    handleLoginSuccess,
  };
  return (
    <GoogleAuthContext.Provider value={sharedData}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export default GoogleAuthProvider;

export const useGoogleAuth = () => {
  return useContext(GoogleAuthContext);
};
