import { useEffect, useState } from "react";
import { PrivateApi, PublicApi } from "../api";
import { useAlertContext } from "../provider/AlertProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Email_verification = () => {
  const [sent, setSent] = useState(false);
  // const [token, setToken] = useState<string | null>(null);
  const { showAlert } = useAlertContext();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

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

  const handleResend = async () => {
    if (!sent) {
      setSent(true);
      const response = await sendVerifyLink();
      console.log(response);

      if (!response) {
        showAlert({ text: "Too many requests", type: "danger" });
      }
      setTimeout(() => {
        setSent(false);
      }, 500);
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const { status } = await PrivateApi.get(`/auth/verify-email/${token}`);

      if (status === 200) {
        showAlert({ text: "Email verified successfully", type: "success" });

        navigate(-1); // Go back one step in history
      }
    } catch (error) {
      console.log(error);

      showAlert({ text: "Failed to verify email", type: "danger" });
    }
  };

  useEffect(() => {
    // const params = new URLSearchParams(location.search);
    // const token = params.get("token");
    // console.log("token");
    // console.log(token);
    if (token) {
      // setToken(token);
      // Token found in URL, perform verification
      verifyEmail(token);
    }
  }, [location.search]);
  if (token) {
    return <div className="pt-6"> "Herecccccccccccccccccccccccccccc";</div>;
  }
  return (
    <div className="pt-20 flex flex-col justify-center items-center">
      <h2 className="w-[400px] scroll-m-20 border-b pb-2 text-md text-center text-gray-500 font-medium tracking-tight first:mt-0">
        We have sent a verification link to your email address, please check
        your email to move forward
      </h2>
      <p className="scroll-m-20 border-b pb-2 text-md text-center text-gray-500 font-medium tracking-tight first:mt-0">
        If you id not receive the email:{" "}
        <span
          onClick={handleResend}
          className="text-blue-500 cursor-pointer hover:underline active:text-black"
        >
          Resend here{" "}
          {sent && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 animate-spin mr-2 inline-block align-middle"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          )}
        </span>
      </p>
    </div>
  );
};

export default Email_verification;
