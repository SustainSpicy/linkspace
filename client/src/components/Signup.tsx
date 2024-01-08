import { ChangeEvent, FormEvent, useState } from "react";
import { PublicApi } from "../api";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { status, data } = await PublicApi.post("/auth/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (status === 201) {
        console.log("User created");
      }
    } catch (error: any) {
      console.log(error.response.data.msg);
    }
  };
  return (
    <motion.form
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto"
    >
      <label className="block mb-2 text-sm text-gray-600">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </label>

      <label className="block mb-2 text-sm text-gray-600">
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </label>

      <label className="block mb-2 text-sm text-gray-600">
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </label>

      <label className="block mb-2 text-sm text-gray-600">
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </label>

      <button
        type="submit"
        className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Signup
      </button>
    </motion.form>
  );
};

export default Signup;
