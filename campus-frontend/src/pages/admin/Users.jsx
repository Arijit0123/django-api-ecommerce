import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { listUsers, createUser, updateUser, deleteUser } from "../../api/adminApi";
import AdminTable from "../../components/AdminTable";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ username: "", email: "", password: "", role: "student" });

    const fetchUsers = () => listUsers().then(res => setUsers(res.data));

    useEffect(() => { fetchUsers(); }, []);

    const handleCreate = async () => {
        await createUser(form);
        fetchUsers();
    };

    const handleEdit = async (user) => {
        const newUsername = prompt("New username:", user.username);
        if (newUsername) {
            await updateUser(user.id, { username: newUsername });
            fetchUsers();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this user?")) {
            await deleteUser(id);
            fetchUsers();
        }
    };

    return (
  <>
    <Navbar />

    <div className="max-w-5xl mx-auto mt-10 px-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Admin – Users</h1>

      {/* User Creation Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Create User</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          onClick={handleCreate}
          className="mt-6 w-full bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition duration-300 cursor-pointer"
        >
          Create
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Users</h2>
        <AdminTable
          data={users}
          columns={["id", "username", "email", "role"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  </>
);
}
