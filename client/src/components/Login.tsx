import { ChangeEvent, FormEvent, useState } from "react";
import { PublicApi } from "../api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
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
      const { status, data } = await PublicApi.post("/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (status === 200) {
        console.log(data);
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
