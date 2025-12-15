import axiosClient from "./axiosClient";

/* =========================
   USERS
========================= */
export const listUsers = () => axiosClient.get("core/users/");
export const createUser = (data) => axiosClient.post("core/register/", data);
export const updateUser = (id, data) => axiosClient.put(`core/users/${id}/`, data);
export const deleteUser = (id) => axiosClient.delete(`core/users/${id}/`);

/* =========================
   COURSES
========================= */
export const listCourses = () => axiosClient.get("courses/");
export const createCourse = (data) => axiosClient.post("courses/", data);
export const updateCourse = (id, data) => axiosClient.put(`courses/${id}/`, data);
export const deleteCourse = (id) => axiosClient.delete(`courses/${id}/`);

/* =========================
   EVENTS
========================= */
// Fetch all events
export const listEvents = () => axiosClient.get("events/");

// Create a new event (Admin/Teacher)
export const createEvent = (data) =>
  axiosClient.post("events/", {
    title: data.title,
    description: data.description,
    date: data.date,
    location: data.location,
  });

// Add a comment to an event
export const commentEvent = (eventId, text) =>
  axiosClient.post("comments/create/", {
    event: eventId,
    text: text,
  });

// Update and delete events if needed
export const updateEvent = (id, data) => axiosClient.put(`events/${id}/`, data);
export const deleteEvent = (id) => axiosClient.delete(`events/${id}/`);
