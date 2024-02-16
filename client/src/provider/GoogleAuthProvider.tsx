import React, { ReactNode, createContext, useContext } from "react";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import { PublicApi } from "../api";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../redux/slice/userSlice";
import { useAlertContext } from "./AlertProvider";
import { useLocation, useNavigate } from "react-router-dom";

interface GoogleAuthContextProps {
  children: ReactNode;
}
const GoogleAuthContext = createContext({
  clientId: "",
  handleLoginSuccess: (_credentialResponse: CredentialResponse) => {},
  logoutUser: () => {},
});

const GoogleAuthProvider: React.FC<GoogleAuthContextProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useAlertContext();
  const clientId = import.meta.env.VITE_CLIENT_ID;

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    // Send the credential to the backend
    await sendCredentialToBackend(credentialResponse.credential);
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

        if (status === 200) {
          const { msg, ...userData } = data;

          dispatch(setUser(userData));
          showAlert({ text: "User Authenticated", type: "success" });
          const { from } = location.state || { from: "/links" };
          navigate(from);
        }
      } catch (error) {
        console.error("Error sending credential to backend:", error);
      }
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    googleLogout();
  };

  const sharedData = {
    clientId,
    handleLoginSuccess,
    logoutUser,
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
