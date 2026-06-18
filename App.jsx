import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import MemberDashboard from "./components/Dashboard/MemberDashboard";
import CoordinatorDashboard from "./components/Dashboard/CoordinatorDashboard";
import GuestHome from "./pages/GuestHome";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import ContactPage from "./pages/Contactpage/ContactPage";
import ManageMembers from "./pages/ManageMembers";
import { useAuth } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import NotApproved from "./pages/NotApproved";
import EventDetails from "./pages/EventDetails";
import PhotoGallery from "./pages/PhotoGallery/PhotoGallery";
import AllMembers from "./pages/AllMembers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper: Decide dashboard path based on role
const getDashboardPath = (user) => {
    if (!user) return "/";
    switch (user.role) {
        case "admin":
            return "/admin-dashboard";
        case "coordinator":
            return "/coordinator-dashboard";
        default:
            return "/member-dashboard";
    }
};

// Route guards
const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

const ApprovedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return user.isApproved ? children : <Navigate to="/not-approved" />;
};

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return user.role === "admin" ? children : <Navigate to="/" />;
};

function App() {
    const { user } = useAuth();

    return (
        <Router>
            <EventProvider>
                <Navbar />
                <div className="min-h-screen">
                    <Routes>
                        {/* Public-like routes */}
                        <Route
                            path="/"
                            element={
                                user ? (
                                    <Navigate to={getDashboardPath(user)} />
                                ) : (
                                    <Home />
                                )
                            }
                        />
                        <Route
                            path="/home"
                            element={
                                user ? (
                                    <Navigate to={getDashboardPath(user)} />
                                ) : (
                                    <Home />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                user ? (
                                    <Navigate to={getDashboardPath(user)} />
                                ) : (
                                    <Login />
                                )
                            }
                        />
                        <Route
                            path="/register"
                            element={user ? <Navigate to="/" /> : <Register />}
                        />
                        <Route path="/guest-home" element={<GuestHome />} />

                        {/* Admin */}
                        <Route
                            path="/admin-dashboard"
                            element={
                                <AdminRoute>
                                    <AdminDashboard />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/members"
                            element={
                                <AdminRoute>
                                    <ManageMembers />
                                </AdminRoute>
                            }
                        />

                        {/* Coordinator */}
                        <Route
                            path="/coordinator-dashboard"
                            element={
                                <ApprovedRoute>
                                    <CoordinatorDashboard />
                                </ApprovedRoute>
                            }
                        />

                        {/* Approved Members */}
                        <Route
                            path="/member-dashboard"
                            element={
                                <ApprovedRoute>
                                    <MemberDashboard />
                                </ApprovedRoute>
                            }
                        />
                        <Route
                            path="/posts"
                            element={
                                <ApprovedRoute>
                                    <Posts />
                                </ApprovedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ApprovedRoute>
                                    <Profile />
                                </ApprovedRoute>
                            }
                        />

                        {/* Public */}
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/gallery" element={<PhotoGallery />} />
                        <Route path="/not-approved" element={<NotApproved />} />
                        <Route
                            path="/events/:eventId"
                            element={<EventDetails />}
                        />
                        <Route path="/all-members" element={<AllMembers />} />
                    </Routes>
                </div>
            </EventProvider>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Router>
    );
}

export default App;
