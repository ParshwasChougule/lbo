import React from "react";

const Topbar = () => {
    return (
        <nav className="navbar navbar-light bg-light px-4 shadow-sm">
            <span className="navbar-brand mb-0 h5">
                Lingayat Business Organization
            </span>

            <div>
                <span className="me-3">Admin</span>
                <img
                    src="https://via.placeholder.com/35"
                    alt="admin"
                    className="rounded-circle"
                />
            </div>
        </nav>
    );
};

export default Topbar;
