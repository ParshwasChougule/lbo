import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = ({ children }) => {
    return (
        <div className="d-flex bg-light min-vh-100">
            <Sidebar />
            <div className="admin-main-content w-100">
                <Topbar />
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
