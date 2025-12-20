import React, { useEffect, useState } from "react";
import { getMembers, getBusinesses, getEvents, getChapters } from "../../services/dataService";

const DashboardCards = () => {
    const [counts, setCounts] = useState({
        members: 0,
        businesses: 0,
        events: 0,
        pending: 0,
        chapters: 0
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const membersData = await getMembers();
                const businessesData = await getBusinesses();
                const eventsData = await getEvents();
                const chaptersData = await getChapters();

                setCounts({
                    members: membersData.length,
                    businesses: businessesData.length,
                    events: eventsData.length,
                    pending: membersData.filter(m => m.status === 'Pending').length, // Assuming 'status' field exists
                    chapters: chaptersData.length
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="row g-4 mb-4">
            {/* Stats Card: Total Members */}
            <div className="col-xl-3 col-md-6">
                <div className="card h-100 border-0 shadow-sm overflow-hidden dash-card" style={{ borderTop: '4px solid #6366f1' }}>
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="p-3 rounded-3" style={{ background: '#6366f1', color: 'white' }}>
                                <i className="fas fa-users fa-lg"></i>
                            </div>
                            <span className="badge bg-success bg-opacity-10 text-success fw-normal border border-success">+2.5%</span>
                        </div>
                        <div>
                            <h3 className="display-5 fw-bold mb-1" style={{ color: '#6366f1' }}>{counts.members}</h3>
                            <p className="mb-0 text-muted fw-medium small text-uppercase">Total Members</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* Stats Card: Total Chapters */}
            <div className="col-xl-3 col-md-6">
                <div className="card h-100 border-0 shadow-sm overflow-hidden dash-card" style={{ borderTop: '4px solid #f59e0b' }}>
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="p-3 rounded-3" style={{ background: '#f59e0b', color: 'white' }}>
                                <i className="fas fa-map-marked-alt fa-lg"></i>
                            </div>
                            <span className="badge bg-primary bg-opacity-10 text-primary fw-normal border border-primary">New</span>
                        </div>
                        <div>
                            <h3 className="display-5 fw-bold mb-1" style={{ color: '#f59e0b' }}>{counts.chapters}</h3>
                            <p className="mb-0 text-muted fw-medium small text-uppercase">Active Chapters</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Card: Pending Approvals */}
            <div className="col-xl-3 col-md-6">
                <div className="card h-100 border-0 shadow-sm overflow-hidden dash-card" style={{ borderTop: '4px solid #ec4899' }}>
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="p-3 rounded-3" style={{ background: '#ec4899', color: 'white' }}>
                                <i className="fas fa-user-clock fa-lg"></i>
                            </div>
                            <span className="badge bg-warning bg-opacity-10 text-warning fw-normal border border-warning">Action Needed</span>
                        </div>
                        <div>
                            <h3 className="display-5 fw-bold mb-1" style={{ color: '#ec4899' }}>{counts.pending}</h3>
                            <p className="mb-0 text-muted fw-medium small text-uppercase">Pending Requests</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                .dash-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .dash-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important;
                }
                .letter-spacing-1 {
                    letter-spacing: 1px;
                }
                `}
            </style>
        </div>
    );
};

export default DashboardCards;
