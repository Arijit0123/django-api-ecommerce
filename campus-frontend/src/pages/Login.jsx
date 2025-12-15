import { useState, useContext } from "react";
import { login, getProfile } from "../api/authApi";

import { redirectByRole } from "../utils/roleRedirect";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


export default function Login() {
    const { loginUser } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1️⃣ Get JWT token
            const tokenRes = await login(form);
            console.log("TOKEN RESPONSE:", tokenRes.data);

            // Save tokens immediately
            localStorage.setItem("access", tokenRes.data.access);
            localStorage.setItem("refresh", tokenRes.data.refresh);

            // 2️⃣ Fetch user profile
            const profileRes = await getProfile();
            console.log("PROFILE RESPONSE:", profileRes.data);

            // 3️⃣ Save auth state
            loginUser({
                access: tokenRes.data.access,
                refresh: tokenRes.data.refresh,
                user: profileRes.data,
            });

            // 4️⃣ Redirect based on role
            navigate(redirectByRole(profileRes.data.role));

        } catch (err) {
            console.error("LOGIN ERROR:", err.response?.data || err.message);
            alert("Invalid username or password");
        }
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-900 via-indigo-800 to-purple-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-2xl w-96"
      >
        {/* College Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-900">
            College Portal
          </h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>

        {/* Username */}
        <input
          type="text"
          placeholder="Student ID / Username"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
        >
          Login
        </button>

        {/* Extra Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-700">Forgot Password?</a>
          <a href="/register" className="hover:text-blue-700">Register</a>
        </div>
      </form>
    </div>
  );
}
