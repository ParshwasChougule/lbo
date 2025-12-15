import React from "react";
// We don't import AdminLayout here because AdminRoutes already wraps these pages in AdminLayout. 
// However, the user's request shows Dashboard wrapping itself in AdminLayout.
// To follow the user's explicit code request, I will use AdminLayout inside the page if that's what is requested,
// OR I will refactor AdminRoutes to not double-wrap.
// Given the previous AdminRoutes implementation used <Route element={<AdminLayout />}> <Outlet /> </Route>,
// using AdminLayout again inside Dashboard would cause nested sidebars.
//
// STRATEGY: I will update Dashboard.jsx to use the user's code but I'll need to check AdminRoutes.jsx.
// If I use the user's code exactly, I should probably remove the layout wrapper from AdminRoutes.jsx 
// to avoid duplication.
//
// For now, I will paste the user's code exactly as requested. 
// If it looks double-wrapped, I will fix AdminRoutes in the next step.

import AdminLayout from "../../components/layout/AdminLayout";
import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardOverview from "../../components/dashboard/DashboardOverview";
const Dashboard = () => {
    return (
        <AdminLayout>
            <h4 className="mb-4">Dashboard</h4>
            <DashboardCards />
            <DashboardOverview />
        </AdminLayout>
    );
};

export default Dashboard;
