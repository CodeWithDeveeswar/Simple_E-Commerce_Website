import { useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";

const userSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userSchema.validate(form, { abortEarly: false });

      setError({});
      setSuccess("Registration Successful");
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
          <h1 className="text-3xl font-bold text-center mb-6">REGISTER</h1>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="border p-3 w-full rounded mb-1"
            onChange={handleChange}
          />
          {error.name && (
            <p className="text-red-600 text-sm mb-3">{error.name}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="border p-3 w-full rounded mb-1"
            onChange={handleChange}
          />
          {error.email && (
            <p className="text-red-600 text-sm mb-3">{error.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="border p-3 w-full rounded mb-1"
            onChange={handleChange}
          />
          {error.password && (
            <p className="text-red-600 text-sm mb-3">{error.password}</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="border p-3 w-full rounded mb-1"
            onChange={handleChange}
          />
          {error.confirmPassword && (
            <p className="text-red-600 text-sm mb-3">{error.confirmPassword}</p>
          )}

          <input
            type="number"
            name="phone"
            placeholder="Enter your phone number"
            className="border p-3 w-full rounded mb-1"
            onChange={handleChange}
          />
          {error.phone && (
            <p className="text-red-600 text-sm mb-3">{error.phone}</p>
          )}

          <textarea
            name="address"
            placeholder="Enter address"
            className="border p-3 w-full rounded mb-1"
            onChange={handleChange}
          ></textarea>
          {error.address && (
            <p className="text-red-600 text-sm mb-3">{error.address}</p>
          )}

          {success && (
            <p className="text-green-600 text-center text-sm mb-3">{success}</p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded mt-3"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Already have an account?
            <Link to="/login  " className="ml-1 font-semibold text-black">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
