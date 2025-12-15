import axiosClient from "./axiosClient";

export const listCourses = () =>
    axiosClient.get("courses/");

export const requestEnrollment = (courseId) =>
    axiosClient.post("enrollments/request/", { course: courseId });

export const myEnrollments = () =>
    axiosClient.get("enrollments/my/");
