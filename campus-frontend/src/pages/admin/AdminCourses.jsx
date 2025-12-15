import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { listCourses, createCourse, updateCourse, deleteCourse } from "../../api/adminApi";
import AdminTable from "../../components/AdminTable";

export default function AdminCourses() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({ title: "", description: "" });

    const fetchCourses = () => listCourses().then(res => setCourses(res.data));

    useEffect(() => { fetchCourses(); }, []);

    const handleCreate = async () => {
        await createCourse(form);
        fetchCourses();
    };

    const handleEdit = async (course) => {
        const newTitle = prompt("New title:", course.title);
        if (newTitle) {
            await updateCourse(course.id, { title: newTitle });
            fetchCourses();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this course?")) {
            await deleteCourse(id);
            fetchCourses();
        }
    };

    return (
  <>
    <Navbar />

    <div className="max-w-5xl mx-auto mt-10 px-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Admin – Courses</h1>

      {/* Course Creation Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Course</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleCreate}
          className="mt-6 w-full bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition duration-300 cursor-pointer"
        >
          Create Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Courses</h2>
        <AdminTable
          data={courses}
          columns={["id", "title", "description"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  </>
);
}
