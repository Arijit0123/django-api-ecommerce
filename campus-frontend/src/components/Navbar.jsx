import { useContext } from "react";
import AuthContext  from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
    <nav className="flex items-center justify-between px-6 py-3 bg-blue-900 text-white shadow-md">
        <span className="font-bold text-lg tracking-wide">
            CampusConnect | {user.role.toUpperCase()}
        </span>

    {/* Right side: Logout button */}
        <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 cursor-pointer"
        >
            Logout
        </button>
    </nav>
);
}
