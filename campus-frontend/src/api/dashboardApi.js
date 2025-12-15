import axiosClient from "./axiosClient";

export const dashboardData = () =>
    axiosClient.get("dashboard/");

export const teacherDashboard = () =>
    axiosClient.get("dashboard/teacher/");

export const studentDashboard = () =>
    axiosClient.get("dashboard/student/");
