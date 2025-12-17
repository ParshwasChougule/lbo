import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardOverview from "../../components/dashboard/DashboardOverview";

const Dashboard = () => {
    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(new Date().toLocaleDateString('en-US', options));
    }, []);

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1">{greeting}, Admin! 👋</h4>
                    <p className="text-muted mb-0 small">{currentDate}</p>
                </div>
                {/* Optional: Add a quick action button if needed, or leave empty */}
            </div>

            <DashboardCards />
            <DashboardOverview />
        </AdminLayout>
    );
};

export default Dashboard;
