import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { dashboardData } from "../../api/dashboardApi";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        dashboardData()
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />

    <div className="max-w-5xl mx-auto mt-10 px-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome, Admin</p>

      {/* Dashboard Links */}
      <ul className="grid gap-6 md:grid-cols-3">
        <li>
          <Link
            to="/dashboard/admin/users"
            className="block bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Manage Users
            </h2>
            <p className="text-sm text-gray-600">Add, edit, or remove users</p>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/admin/courses"
            className="block bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Manage Courses
            </h2>
            <p className="text-sm text-gray-600">Create and update course catalog</p>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/admin/events"
            className="block bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Manage Events
            </h2>
            <p className="text-sm text-gray-600">Organize campus activities</p>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
}
