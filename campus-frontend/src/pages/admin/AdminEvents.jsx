import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  commentEvent,
} from "../../api/adminApi";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [comments, setComments] = useState({}); // Holds comment input per event

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const res = await listEvents();
      setEvents(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    listEvents()
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err.response?.data || err));
  }, []);

  // Create a new event
  const handleCreateEvent = async () => {
    const { title, description, date, location } = newEvent;

    if (!title || !description || !date || !location) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createEvent(newEvent);
      alert("Event created!");
      setNewEvent({ title: "", description: "", date: "", location: "" });
      fetchEvents();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error creating event");
    }
  };

  // Update an existing event
  const handleUpdateEvent = async (e) => {
    const newTitle = prompt("Enter new title:", e.title);
    const newDescription = prompt("Enter new description:", e.description);
    const newDate = prompt("Enter new date:", e.date);
    const newLocation = prompt("Enter new location:", e.location);

    if (!newTitle || !newDescription || !newDate || !newLocation) return;

    try {
      await updateEvent(e.id, {
        title: newTitle,
        description: newDescription,
        date: newDate,
        location: newLocation,
      });
      alert("Event updated!");
      fetchEvents();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error updating event");
    }
  };

  // Delete an event
  const handleDeleteEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(id);
      alert("Event deleted!");
      fetchEvents();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error deleting event");
    }
  };

  // Add comment to an event
  const handleComment = async (eventId) => {
    const text = comments[eventId];
    if (!text || !text.trim()) return;

    try {
      await commentEvent(eventId, text);
      alert("Comment added!");
      setComments({ ...comments, [eventId]: "" });
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error adding comment");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-6">
        {/* Create Event Form */}
        <div className="bg-gray-100 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-semibold mb-4">Create Event</h3>

          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg mb-2"
          />

          <input
            type="text"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg mb-2"
          />

          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg mb-2"
          />

          <input
            type="text"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg mb-4"
          />

          <button
            onClick={handleCreateEvent}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
          >
            Create Event
          </button>
        </div>

        {/* Events List */}
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

              {/* Edit & Delete Buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => handleUpdateEvent(e)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDeleteEvent(e.id)}
                >
                  Delete
                </button>
              </div>

              {/* Comment Input */}
              <input
                type="text"
                value={comments[e.id] || ""}
                onChange={(ev) =>
                  setComments({ ...comments, [e.id]: ev.target.value })
                }
                placeholder="Write a comment..."
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
