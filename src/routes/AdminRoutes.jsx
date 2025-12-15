import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import Members from '../pages/admin/Members';
import Business from '../pages/admin/Business';
import Chapters from '../pages/admin/Chapters';
import Events from '../pages/admin/Events';
import Settings from '../pages/admin/Settings';
import Login from '../pages/admin/Login';
import OutletWrapper from '../components/layout/OutletWrapper';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    if (!currentUser) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <OutletWrapper />
                </ProtectedRoute>
            }>
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="members" element={<Members />} />
                <Route path="chapters" element={<Chapters />} />
                <Route path="business" element={<Business />} />
                <Route path="events" element={<Events />} />
                <Route path="sponsors" element={<Settings />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
