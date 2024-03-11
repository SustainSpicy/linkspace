import { ChangeEvent, FormEvent, useState } from "react";
import { PrivateApi, PublicApi } from "../api";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { setUser } from "../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { useAlertContext } from "../provider/AlertProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../constant";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert } = useAlertContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = DOMPurify.sanitize(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: sanitizedInput,
    }));
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      showAlert({ text: "Please fill in all fields.", type: "danger" });

      return;
    }
    setIsLoading(true);

    try {
      const { status, data } = await PublicApi.post("/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (status === 200) {
        const { msg, ...userData } = data;
        console.log(userData);

        dispatch(setUser(userData));
        showAlert({ text: "User authenticated", type: "success" });

        handleLoggin(userData.emailVerification.valid);
      }
    } catch (error: any) {
      const errorText = error.response.data.msg;

      showAlert({ text: errorText, type: "danger" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <motion.form
      key={"signin"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto text-text"
    >
      <div className="mb-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          className="w-full text-gray-600 border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          // autoComplete="email"
          aria-required
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-text text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          className="w-full text-gray-600 border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          aria-required
          required
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="w-full mt-4 bg-background text-white p-2 rounded hover:bg-accent"
        >
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              className="w-5 h-5 animate-spin mr-2 inline-block align-middle "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : null}
          Login
        </button>
      </div>
    </motion.form>
  );
};

export default Login;
