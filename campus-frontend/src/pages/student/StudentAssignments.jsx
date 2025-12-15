import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { listAssignments, submitAssignment } from "../../api/assignmentApi";

export default function StudentAssignments() {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        listAssignments().then(res => setAssignments(res.data));
    }, []);

    return (
  <>
    <Navbar />

    <div className="max-w-4xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold text-blue-900 mb-8">Assignments</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {assignments.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              {a.title}
            </h4>
            <button
              onClick={() => submitAssignment({ assignment: a.id })}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300 cursor-pointer"
            >
              Submit
            </button>
          </div>
        ))}
      </div>
    </div>
  </>
);
}
