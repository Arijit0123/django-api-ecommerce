import { useState } from "react";
import AuthContext  from "./AuthContext";

export default function AuthProvider({ children }) {

    const getInitialUser = () => {
        try {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    };

    const [user, setUser] = useState(getInitialUser);

    const loginUser = (userData) => {
        localStorage.setItem("access", userData.access);
        localStorage.setItem("refresh", userData.refresh);
        localStorage.setItem("user", JSON.stringify(userData.user));
        setUser(userData.user);
    };

    const logoutUser = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}
