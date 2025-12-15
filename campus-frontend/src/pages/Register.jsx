import { useState } from "react";
import { register } from "../api/authApi";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "student",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await register(form);
            console.log("Registered:", res.data);
            alert("Registration successful!");
        } catch (err) {
            console.error("Registration error:", err.response?.data || err);
            alert(
                JSON.stringify(err.response?.data || "Registration failed", null, 2)
            );
        }
    };

    return (
  <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-900 via-indigo-800 to-purple-700">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-2xl w-96"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">
        Register
      </h2>

      {/* Username */}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Role */}
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
      >
        Register
      </button>
    </form>
  </div>
);

}
