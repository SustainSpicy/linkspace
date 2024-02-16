import { ChangeEvent, FormEvent, useState } from "react";
import { PublicApi } from "../api";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { setUser } from "../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { useAlertContext } from "../provider/AlertProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useAlertContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log(location);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = DOMPurify.sanitize(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: sanitizedInput,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      showAlert({ text: "Please fill in all fields.", type: "danger" });

      return;
    }
    try {
      const { status, data } = await PublicApi.post("/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (status === 200) {
        const { msg, ...userData } = data;

        dispatch(setUser(userData));

        showAlert({ text: "User authenticated", type: "success" });

        const { from } = location.state || { from: "/links" };
        console.log(from);

        navigate(from);
      }
    } catch (error: any) {
      console.log(error.response.data.msg);
    }
  };
  return (
    <motion.form
      key={"signin"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto  "
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </motion.form>
  );
};

export default Login;
