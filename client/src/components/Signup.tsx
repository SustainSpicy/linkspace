import { ChangeEvent, FormEvent, useState } from "react";
import { PublicApi } from "../api";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { useAlertContext } from "../provider/AlertProvider";

interface signupProps {
  setAuthType: (prop: number) => void;
}
const Signup: React.FC<signupProps> = ({ setAuthType }) => {
  const { showAlert } = useAlertContext();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = DOMPurify.sanitize(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: sanitizedInput,
    }));
  };
  const validateEmail = (email: string): boolean => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/g;
    return regex.test(email);
  };

  const validatePasswordLength = (password: string): boolean => {
    return password.length >= 6;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      showAlert({
        text: "Please enter a valid email address.",
        type: "warning",
      });
      return;
    }

    if (!validatePasswordLength(formData.password)) {
      showAlert({
        text: "Your password should be at least six characters long.",
        type: "warning",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { status } = await PublicApi.post("/auth/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (status === 201) {
        showAlert({ text: "User created", type: "success" });
        setAuthType(1);
      }
    } catch (error: any) {
      const errorText = error.response.data.msg;
      console.log(errorText);
      showAlert({ text: "Registration Error", type: "danger" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <motion.form
      key={"signup"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto text-text"
    >
      <div className="mb-4">
        <label className="block  text-sm ">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          disabled={isLoading}
          required
          className="w-full text-gray-600  mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm ">First Name:</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          disabled={isLoading}
          onChange={handleChange}
          required
          className="w-full mt-2 text-gray-600 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm ">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          disabled={isLoading}
          onChange={handleChange}
          required
          className="w-full text-gray-600 mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm ">
          Password:
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            disabled={isLoading}
            onChange={handleChange}
            required
            autoComplete="new-password"
            className="w-full text-gray-600 mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-background text-white p-2 rounded hover:bg-accent disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={
          !formData.email ||
          !formData.firstName ||
          !formData.lastName ||
          !formData.password ||
          !validateEmail(formData.email) ||
          !validatePasswordLength(formData.password)
        }
      >
        {" "}
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
        Signup
      </button>
    </motion.form>
  );
};

export default Signup;
