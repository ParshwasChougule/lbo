import React, { useEffect, useState } from "react";
import { getMembers, getBusinesses, getEvents } from "../../services/dataService";

const DashboardCards = () => {
    const [counts, setCounts] = useState({
        members: 0,
        businesses: 0,
        events: 0,
        pending: 0
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const membersData = await getMembers();
                const businessesData = await getBusinesses();
                const eventsData = await getEvents();

                setCounts({
                    members: membersData.length,
                    businesses: businessesData.length,
                    events: eventsData.length,
                    pending: membersData.filter(m => m.status === 'Pending').length // Assuming 'status' field exists
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="row g-4">
            <div className="col-md-3">
                <div className="card shadow border-0 border-start border-primary border-4 rounded-4 h-100">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="text-muted text-uppercase fw-bold small mb-0">Total Members</h6>
                            <div className="text-primary bg-primary bg-opacity-10 rounded-circle p-2">
                                <i className="fas fa-users fa-lg"></i>
                            </div>
                        </div>
                        <h2 className="fw-bold text-dark mb-0">{counts.members}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow border-0 border-start border-success border-4 rounded-4 h-100">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="text-muted text-uppercase fw-bold small mb-0">Total Businesses</h6>
                            <div className="text-success bg-success bg-opacity-10 rounded-circle p-2">
                                <i className="fas fa-briefcase fa-lg"></i>
                            </div>
                        </div>
                        <h2 className="fw-bold text-dark mb-0">{counts.businesses}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow border-0 border-start border-info border-4 rounded-4 h-100">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="text-muted text-uppercase fw-bold small mb-0">Events</h6>
                            <div className="text-info bg-info bg-opacity-10 rounded-circle p-2">
                                <i className="fas fa-calendar-alt fa-lg"></i>
                            </div>
                        </div>
                        <h2 className="fw-bold text-dark mb-0">{counts.events}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow border-0 border-start border-warning border-4 rounded-4 h-100">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="text-muted text-uppercase fw-bold small mb-0">Pending Approvals</h6>
                            <div className="text-warning bg-warning bg-opacity-10 rounded-circle p-2">
                                <i className="fas fa-user-clock fa-lg"></i>
                            </div>
                        </div>
                        <h2 className="fw-bold text-dark mb-0">{counts.pending}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCards;
