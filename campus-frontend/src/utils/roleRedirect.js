export const redirectByRole = (role) => {
    if (role === "admin") return "/dashboard/admin";
    if (role === "teacher") return "/dashboard/teacher";
    return "/dashboard/student";
};
