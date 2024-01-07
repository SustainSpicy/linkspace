import { ChangeEvent, FormEvent, useState } from "react";
import { PublicApi } from "../api";

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
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          // autoComplete="first-name"
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          // autoComplete="lastname"
        />
      </label>
      <br />
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
      </label>
      <br />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
