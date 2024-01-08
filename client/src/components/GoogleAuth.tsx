import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../provider/GoogleAuthProvider";

const GoogleAuth = () => {
  const { clientId, handleLoginSuccess } = useGoogleAuth();
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleLoginSuccess(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        type="icon"
        size="large"

        // useOneTap
        // auto_select
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
