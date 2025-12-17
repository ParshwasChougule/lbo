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
                <div className="card h-100 border-0 shadow-sm overflow-hidden dash-card" style={{ background: 'linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)' }}>
                    <div className="card-body p-4 position-relative text-white">
                        <div className="d-flex justify-content-between align-items-center mb-4 position-relative z-1">
                            <div className="bg-white bg-opacity-25 p-2 rounded-3">
                                <i className="fas fa-users fa-lg text-white"></i>
                            </div>
                            <span className="badge bg-white bg-opacity-25 text-white fw-normal">+2.5%</span>
                        </div>
                        <div className="position-relative z-1">
                            <h3 className="display-5 fw-bold mb-1">{counts.members}</h3>
                            <p className="mb-0 opacity-75 fw-medium small text-uppercase letter-spacing-1">Total Members</p>
                        </div>
                        <i className="fas fa-users position-absolute opacity-10" style={{ fontSize: '150px', right: '-20px', bottom: '-40px' }}></i>
                    </div>
                </div>
            </div>



            {/* Stats Card: Total Chapters */}
            <div className="col-xl-3 col-md-6">
                <div className="card h-100 border-0 shadow-sm overflow-hidden dash-card" style={{ background: 'linear-gradient(135deg, #FBAB7E 0%, #F7CE68 100%)' }}>
                    <div className="card-body p-4 position-relative text-white">
                        <div className="d-flex justify-content-between align-items-center mb-4 position-relative z-1">
                            <div className="bg-white bg-opacity-25 p-2 rounded-3">
                                <i className="fas fa-map-marked-alt fa-lg text-white"></i>
                            </div>
                            <span className="badge bg-white bg-opacity-25 text-white fw-normal">New</span>
                        </div>
                        <div className="position-relative z-1">
                            <h3 className="display-5 fw-bold mb-1">{counts.chapters}</h3>
                            <p className="mb-0 opacity-75 fw-medium small text-uppercase letter-spacing-1">Active Chapters</p>
                        </div>
                        <i className="fas fa-map-marked-alt position-absolute opacity-10" style={{ fontSize: '150px', right: '-20px', bottom: '-40px' }}></i>
                    </div>
                </div>
            </div>

            {/* Stats Card: Pending Approvals */}
            <div className="col-xl-3 col-md-6">
                <div className="card h-100 border-0 shadow-sm overflow-hidden dash-card" style={{ background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)' }}>
                    <div className="card-body p-4 position-relative text-white">
                        <div className="d-flex justify-content-between align-items-center mb-4 position-relative z-1">
                            <div className="bg-white bg-opacity-25 p-2 rounded-3">
                                <i className="fas fa-user-clock fa-lg text-white"></i>
                            </div>
                            <span className="badge bg-white bg-opacity-25 text-white fw-normal">Action Needed</span>
                        </div>
                        <div className="position-relative z-1">
                            <h3 className="display-5 fw-bold mb-1">{counts.pending}</h3>
                            <p className="mb-0 opacity-75 fw-medium small text-uppercase letter-spacing-1">Pending Requests</p>
                        </div>
                        <i className="fas fa-user-clock position-absolute opacity-10" style={{ fontSize: '150px', right: '-20px', bottom: '-40px' }}></i>
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
