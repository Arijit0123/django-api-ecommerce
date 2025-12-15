import axiosClient from "./axiosClient";

export const listAssignments = () =>
    axiosClient.get("assignments/");

export const submitAssignment = (data) =>
    axiosClient.post("assignments/submit/", data);
