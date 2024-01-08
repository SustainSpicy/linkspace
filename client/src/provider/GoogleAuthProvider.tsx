import React, { ReactNode, createContext, useContext } from "react";
import { CredentialResponse } from "@react-oauth/google";
import { PublicApi } from "../api";

interface GoogleAuthContextProps {
  children: ReactNode;
}
const GoogleAuthContext = createContext({
  clientId: "",
  handleLoginSuccess: (credentialResponse: CredentialResponse) => {},
  logout: () => {},
});

const GoogleAuthProvider: React.FC<GoogleAuthContextProps> = ({ children }) => {
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
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        }
      } catch (error) {
        console.error("Error sending credential to backend:", error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    googleLogout();
  };

  const sharedData = {
    clientId,
    handleLoginSuccess,
    logout,
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
