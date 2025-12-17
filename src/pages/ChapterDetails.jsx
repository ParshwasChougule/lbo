import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { getChapterById, getChapters } from '../services/dataService';

// Static content for aesthetics that isn't in DB yet
const staticChapterContent = {
    sangli: {
        description: "The Sangli Chapter stands as a pillar of our community, fostering growth in agro-business, trade, and education. We are dedicated to creating a supportive ecosystem for local entrepreneurs.",
        email: "sangli@lbo.in",
        phone: "+91 98765 43210",
        location: "Sangli, Maharashtra",
        image: "https://via.placeholder.com/1200x400?text=Sangli+Chapter",
        established: "2018"
    },
    kolhapur: {
        description: "Known for its rich cultural heritage and industrial prowess, the Kolhapur Chapter drives innovation in manufacturing, textiles, and foundry sectors.",
        email: "kolhapur@lbo.in",
        phone: "+91 98765 43211",
        location: "Kolhapur, Maharashtra",
        image: "https://via.placeholder.com/1200x400?text=Kolhapur+Chapter",
        established: "2019"
    },
    ichalkaranji: {
        description: "The 'Manchester of Maharashtra', our Ichalkaranji chapter is a vibrant hub for textile entrepreneurs, focusing on modernization and global exports.",
        email: "ichalkaranji@lbo.in",
        phone: "+91 98765 43212",
        location: "Ichalkaranji, Maharashtra",
        image: "https://via.placeholder.com/1200x400?text=Ichalkaranji+Chapter",
        established: "2020"
    },
    solapur: {
        description: "Focusing on textiles, Solapur Chaddar, and religious tourism, the Solapur chapter is rapidly growing and connecting traditional businesses with new markets.",
        email: "solapur@lbo.in",
        phone: "+91 98765 43213",
        location: "Solapur, Maharashtra",
        image: "https://via.placeholder.com/1200x400?text=Solapur+Chapter",
        established: "2021"
    },
    pune: {
        description: "The IT and Education hub, Pune Chapter connects tech startups with traditional businesses for digital transformation and growth.",
        email: "pune@lbo.in",
        phone: "+91 98765 43214",
        location: "Pune, Maharashtra",
        image: "https://via.placeholder.com/1200x400?text=Pune+Chapter",
        established: "2017"
    },
    belgav: {
        description: "Bridging borders, the Belagavi Chapter focuses on cross-state trade, education, and cultural exchange.",
        email: "belagavi@lbo.in",
        phone: "+91 98765 43215",
        location: "Belagavi, Karnataka",
        image: "https://via.placeholder.com/1200x400?text=Belagavi+Chapter",
        established: "2022"
    }
};

const ChapterDetails = () => {
    // 'city' here acts as the 'id' because we linked to /chapters/:id
    const { city: chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllImages, setShowAllImages] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try to fetch by ID first (dynamic behavior)
                // However, user might be inputting a static name like 'sangli' which is NOT the ID
                let doc = await getChapterById(chapterId);

                // If not found by ID, it might be that we are using a City Name in the URL
                // Let's try to find a chapter in the DB that has this name
                if (!doc) {
                    const all = await getChapters();
                    doc = all.find(c => c.name.toLowerCase().includes(chapterId.toLowerCase()) ||
                        chapterId.toLowerCase().includes(c.name.toLowerCase()));
                }

                if (doc) {
                    // Normalize name to finding static content key
                    // e.g. "Sangli" -> "sangli"
                    const key = doc.name?.toLowerCase().split(' ')[0] || 'default';
                    const staticInfo = staticChapterContent[key] || {};

                    // Merge DB data with static fallback
                    setChapter({
                        ...staticInfo,      // Description, images, etc.
                        ...doc,             // Overwrite with DB data (Name, ID, Stats, Leadership)
                        // Ensure we use DB stats if available, else fallback
                        members: doc.stats?.activeMembers ? `${doc.stats.activeMembers}+` : (staticInfo.members || "0+"),
                        leader: doc.leadership?.president || staticInfo.leader || "TBD",
                        vicePresident: doc.leadership?.vicePresident || "TBD"
                    });
                } else {
                    // Handle case where NO DB entry exists at all (Fallback to purely static)
                    const staticData = staticChapterContent[chapterId.toLowerCase()];
                    if (staticData) {
                        setChapter({
                            name: chapterId.charAt(0).toUpperCase() + chapterId.slice(1) + " Chapter",
                            ...staticData,
                            members: staticData.members || "100+",
                            leader: staticData.leader || "TBD"
                        });
                    }
                }
            } catch (error) {
                console.error("Error loading chapter details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [chapterId]);

    if (loading) {
        return <div className="text-center py-5"><Spinner animation="border" /></div>;
    }

    if (!chapter) {
        return (
            <Container className="py-5 text-center">
                <h2>Chapter Not Found</h2>
                <p>The requested chapter details are not available.</p>
                <Button as={Link} to="/chapters" variant="primary">View All Chapters</Button>
            </Container>
        );
    }

    return (
        <div className="chapter-details-page">
            {/* Hero Section */}
            <section className="position-relative py-5 text-white overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #FF6600 0%, #FF8C00 100%)',
                    minHeight: '350px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div className="position-absolute w-100 h-100" style={{ background: 'url(/assets/images/pattern.png) repeat', opacity: 0.1 }}></div>
                <Container className="position-relative z-1">
                    <Row className="align-items-center">
                        <Col lg={8}>
                            <span className="badge bg-white text-primary mb-2 px-3 py-2 rounded-pill fw-bold">Active Chapter</span>
                            <h1 className="display-3 fw-bold mb-3">{chapter.name}</h1>
                            <p className="lead opacity-90 mb-0" style={{ maxWidth: '600px' }}>
                                {chapter.location || "Location not specified"}
                            </p>
                        </Col>
                        <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
                            <Button as={Link} to="/register" variant="light" size="lg" className="rounded-pill px-5 shadow fw-bold text-primary">
                                Join This Chapter
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Main Content */}
            <section className="py-5 bg-light">
                <Container>
                    <Row className="g-5">
                        {/* Sidebar */}
                        <Col lg={4} className="order-lg-2">
                            <Card className="border-0 shadow-sm rounded-4 mb-4">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-4 border-bottom pb-2">Chapter Stats</h5>
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="bg-primary-light text-primary rounded-3 p-3 me-3">
                                            <i className="fas fa-users fs-4"></i>
                                        </div>
                                        <div>
                                            <h3 className="fw-bold mb-0">{chapter.members}</h3>
                                            <div className="text-muted small">Active Members</div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="bg-primary-light text-primary rounded-3 p-3 me-3">
                                            <i className="fas fa-calendar-check fs-4"></i>
                                        </div>
                                        <div>
                                            <h3 className="fw-bold mb-0">{chapter.established || "2023"}</h3>
                                            <div className="text-muted small">Established Since</div>
                                        </div>
                                    </div>

                                    <h5 className="fw-bold mb-3 mt-5 border-bottom pb-2">Contact Info</h5>
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-3 d-flex align-items-center">
                                            <i className="fas fa-envelope text-primary me-3"></i>
                                            <a href={`mailto:${chapter.email || 'info@lbo.in'}`} className="text-decoration-none text-muted">{chapter.email || 'info@lbo.in'}</a>
                                        </li>
                                        <li className="mb-3 d-flex align-items-center">
                                            <i className="fas fa-phone-alt text-primary me-3"></i>
                                            <span className="text-muted">{chapter.phone || '+91 00000 00000'}</span>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <i className="fas fa-map-marker-alt text-primary me-3"></i>
                                            <span className="text-muted">{chapter.location || 'India'}</span>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Content Area */}
                        <Col lg={8} className="order-lg-1">
                            {/* About Section */}
                            <div className="bg-white p-4 p-lg-5 rounded-4 shadow-sm mb-5">
                                <h3 className="fw-bold mb-4 text-primary">About Us</h3>
                                <p className="lead text-muted mb-4">
                                    {chapter.description || "Welcome to our chapter page. We are dedicated to connecting Lingayat business owners."}
                                </p>
                                <p className="text-muted">
                                    We conduct regular monthly meetings, business networking sessions, and training programs to help our members scale their businesses. Being part of the {chapter.name} means having a family of supporters who root for your success.
                                </p>
                            </div>

                            {/* Leadership Team */}
                            <div className="mb-5">
                                <h3 className="fw-bold mb-4">Chapter Leadership</h3>
                                <Row className="g-4">
                                    <Col md={6}>
                                        <div className="bg-white p-4 rounded-4 shadow-sm h-100 d-flex align-items-center border-start border-4 border-primary">
                                            <div className="me-3">
                                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                                                    <i className="fas fa-user"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="fw-bold mb-1">{chapter.leader}</h5>
                                                <p className="text-primary small mb-0 fw-bold text-uppercase">President</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="bg-white p-4 rounded-4 shadow-sm h-100 d-flex align-items-center border-start border-4 border-primary">
                                            <div className="me-3">
                                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                                                    VC
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="fw-bold mb-1">{chapter.vicePresident}</h5>
                                                <p className="text-primary small mb-0 fw-bold text-uppercase">Vice President</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            {/* Recent Highlights */}
                            <div className="bg-white p-4 p-lg-5 rounded-4 shadow-sm">
                                <div className="d-flex justify-content-between align-items-end mb-4">
                                    <h3 className="fw-bold mb-0">Recent Highlights</h3>
                                    {chapter.images && chapter.images.length > 3 && (
                                        <Button
                                            variant="link"
                                            className="text-decoration-none fw-bold"
                                            onClick={() => setShowAllImages(!showAllImages)}
                                        >
                                            {showAllImages ? 'Show Less' : 'View Gallery'}
                                            <i className={`fas fa-arrow-${showAllImages ? 'up' : 'right'} ms-1`}></i>
                                        </Button>
                                    )}
                                </div>

                                <Row className="g-3">
                                    {chapter.images && chapter.images.length > 0 ? (
                                        chapter.images.slice(0, showAllImages ? undefined : 3).map((imgUrl, idx) => (
                                            <Col md={4} key={idx}>
                                                <div className="rounded-3 bg-light overflow-hidden shadow-sm position-relative group-hover-zoom" style={{ height: '220px' }}>
                                                    <img
                                                        src={imgUrl}
                                                        alt={`Chapter Highlight ${idx + 1}`}
                                                        className="w-100 h-100 object-fit-cover transition-transform"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                </div>
                                            </Col>
                                        ))
                                    ) : chapter.image || chapter.img ? (
                                        <Col md={12}>
                                            <div className="rounded-3 bg-light overflow-hidden shadow-sm" style={{ height: '350px' }}>
                                                <img
                                                    src={chapter.img || chapter.image}
                                                    alt="Chapter Main Highlight"
                                                    className="w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        </Col>
                                    ) : (
                                        <Col xs={12} className="text-center py-5 text-muted bg-light rounded-4">
                                            <i className="fas fa-images fa-3x mb-3 opacity-25"></i>
                                            <p className="mb-0">No highlight images available for this chapter yet.</p>
                                        </Col>
                                    )}
                                </Row>
                            </div>

                            <div className="mt-5 text-center">
                                <Link to="/chapters" className="text-muted text-decoration-none fw-medium">
                                    <i className="fas fa-arrow-left me-2"></i> Back to Main List
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default ChapterDetails;
