import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutAdmin } from "../../services/authService";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path) ? "active-link" : "";

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logoutAdmin();
            navigate('/admin/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="admin-sidebar d-flex flex-column">
            <div className="sidebar-brand text-center d-flex align-items-center justify-content-center gap-2">
                <span>🚀 LBO Admin</span>
            </div>

            <ul className="nav nav-pills flex-column p-3 gap-1">
                <li className="nav-item">
                    <Link className={`nav-link ${isActive('/admin/dashboard')}`} to="/admin/dashboard">
                        📊 <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${isActive('/admin/members')}`} to="/admin/members">
                        👤 <span>Members</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${isActive('/admin/chapters')}`} to="/admin/chapters">
                        🏙️ <span>Chapters</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${isActive('/admin/events')}`} to="/admin/events">
                        📅 <span>Events</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${isActive('/admin/sponsors')}`} to="/admin/sponsors">
                        📢 <span>Sponsors</span>
                    </Link>
                </li>
            </ul>

            <div className="mt-auto p-3 border-top border-secondary border-opacity-25">
                <button className="nav-link text-danger w-100 text-start border-0 bg-transparent" onClick={handleLogout}>
                    🚪 <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
