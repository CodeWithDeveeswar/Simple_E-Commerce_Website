import { useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),

  password: yup.string().required("Password is required"),
});

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(form, { abortEarly: false });

      setError({});
      setSuccess("Login Successful");
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setError(newErrors);
      setSuccess("");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <form
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className="text-3xl font-bold text-center mb-6">LOG IN</h1>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="border p-3 w-full rounded mb-1"
            onChange={handleChange}
          />
          {error.email && (
            <p className="text-red-600 text-sm mb-3">{error.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-3 w-full rounded mb-1"
            onChange={handleChange}
          />
          {error.password && (
            <p className="text-red-600 text-sm mb-3">{error.password}</p>
          )}

          {success && (
            <p className="text-green-600 text-center text-sm mb-3">{success}</p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded mt-4"
          >
            Log in
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Don't have an account?
            <Link to="/" className="ml-1 font-semibold text-black">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
