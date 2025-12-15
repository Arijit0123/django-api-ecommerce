import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { listCourses, requestEnrollment } from "../../api/courseApi";

export default function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        listCourses().then(res => setCourses(res.data));
    }, []);

    return (
    <>
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
                Available Courses
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                {courses.map((course) => (
                <div
            key={course.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {course.title}
            </h4>
            <button
              onClick={() => requestEnrollment(course.id)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 cursor-pointer"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
        </div>
    </>
);

}
