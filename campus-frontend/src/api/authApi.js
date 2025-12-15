import axiosClient from "./axiosClient";

export const login = (data) => axiosClient.post("token/", data);

export const getProfile = () => axiosClient.get("core/profile/");

export const register = (data) =>
    axiosClient.post("core/register/", data);

export const changePassword = (data) =>
    axiosClient.post("core/change-password/", data);

export const forgotPassword = (data) =>
    axiosClient.post("core/forgot-password/", data);

export const resetPassword = (data) =>
    axiosClient.post("core/reset-password/", data);
