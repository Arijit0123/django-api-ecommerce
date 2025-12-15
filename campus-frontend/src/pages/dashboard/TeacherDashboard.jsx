import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
    const { user } = useContext(AuthContext);

    return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />

    <div className="max-w-4xl mx-auto mt-10 px-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-900 mb-2">
        Teacher Dashboard
      </h1>
      <p className="text-gray-700 mb-6">Welcome, {user.username}</p>

      {/* Dashboard Links */}
      <ul className="grid gap-6 md:grid-cols-3">
        <li>
          <Link
            to="/dashboard/teacher/courses"
            className="block bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              My Courses
            </h2>
            <p className="text-sm text-gray-600">Manage your classes</p>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/teacher/assignments"
            className="block bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Assignments
            </h2>
            <p className="text-sm text-gray-600">Create & grade tasks</p>
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard/teacher/events"
            className="block bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Events
            </h2>
            <p className="text-sm text-gray-600">View campus activities</p>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
}
