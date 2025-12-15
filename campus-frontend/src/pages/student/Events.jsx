import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { listEvents, commentEvent } from "../../api/adminApi"; // reuse your API functions

export default function Events() {
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState({}); // store input per event

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await listEvents();
        setEvents(res.data);
      } catch (err) {
        console.error(err.response?.data || err);
      }
    };
    fetchEvents();
  }, []);

  // Handle adding comment
  const handleComment = async (eventId) => {
    const text = comments[eventId] || "";
    if (!text.trim()) return;

    try {
      await commentEvent(eventId, text);
      alert("Comment added!");
      setComments((prev) => ({ ...prev, [eventId]: "" }));
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error adding comment");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Events</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold mb-2">{e.title}</h4>
              <p className="text-gray-600 mb-2">{e.description}</p>
              <p className="text-gray-500 mb-2">Date: {e.date}</p>
              <p className="text-gray-500 mb-4">Location: {e.location}</p>

              <input
                type="text"
                placeholder="Write a comment..."
                value={comments[e.id] || ""}
                onChange={(ev) =>
                  setComments((prev) => ({ ...prev, [e.id]: ev.target.value }))
                }
                className="w-full border px-3 py-2 rounded-lg mb-2"
              />
              <button
                onClick={() => handleComment(e.id)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Comment
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
