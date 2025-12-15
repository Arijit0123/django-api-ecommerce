import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext  from "./context/AuthContext";
import { useContext } from "react";
import TeacherDashboard from "./pages/dashboard/Teacherdashboard";
import AuthProvider from "./context/AuthProvider";
import Courses from "./pages/student/Courses";
import Events from "./pages/student/Events";
import StudentAssignments from "./pages/student/StudentAssignments";
import Users from "./pages/admin/Users";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminEvents from "./pages/admin/AdminEvents";


function AppRoutes() {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard/admin"
                element={
                    <ProtectedRoute user={user}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/teacher"
                element={
                    <ProtectedRoute user={user}>
                        <TeacherDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/student"
                element={
                    <ProtectedRoute user={user}>
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/student/courses"
                element={
                    <ProtectedRoute user={user}>
                        <Courses />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/student/assignments"
                element={
                    <ProtectedRoute user={user}>
                        <StudentAssignments />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboard/student/events"
                element={
                    <ProtectedRoute user={user}>
                        <Events />
                    </ProtectedRoute>
                }
            />
            <Route 
                path="/dashboard/admin/users" 
                element={
                    <ProtectedRoute user={user}>
                        <Users />
                    </ProtectedRoute>} />
            <Route path="/dashboard/admin/courses" element={<ProtectedRoute user={user}><AdminCourses /></ProtectedRoute>} />
            <Route path="/dashboard/admin/events" element={<ProtectedRoute user={user}><AdminEvents /></ProtectedRoute>} />
        </Routes> 
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}
