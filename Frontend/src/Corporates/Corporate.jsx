import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostChallengeModal from '../Components/PostChallengeModal';
import SolutionsList from '../Components/SolutionsList';
import { GridScan } from './GridScan';
import './GridScan.css';
import SplitText from './SplitText';
import { ValueProposition, HowItWorks, CorporateFooter } from './CorporateSections';
import './Corporate.css';

const Corporate = () => {
    const { user, userType, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [showSolutions, setShowSolutions] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handlePostChallenge = () => {
        if (isAuthenticated && userType === 'corporate') {
            setShowChallengeModal(true);
        } else {
            alert('Please login as a corporate to post challenges');
        }
    };

    const handleViewSolutions = () => {
        setShowSolutions(true);
    };

    return (
        <div className="corporate-page">

            <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                <GridScan
                    sensitivity={0.55}
                    lineThickness={1}
                    linesColor="#392e4e"
                    gridScale={0.1}
                    scanColor="#ea57e5ff"
                    scanOpacity={0.4}
                    enablePost
                    bloomIntensity={0.6}
                    chromaticAberration={0.002}
                    noiseIntensity={0.01}
                />
            </div>

            {/* Navbar */}
            <div id="startup-page">
                 <nav className="startup-nav">
                   <h1>CollabX</h1>
           
                   <div className="services">
                     <Link to="/">Home</Link>
                     {/* <Link to="/startup">StartUps</Link> */}
                     {/* <Link to="/corporate">Corporates</Link> */}
                     {isAuthenticated ? (
                       <>
                         <span className="user-info">
                           {userType === 'startup' ? (user?.founderName || user?.companyName) : (user?.contactPerson || user?.companyName)}
                           <span className="user-badge"></span>
                         </span>
                         <button onClick={handleLogout} className="logout-btn">
                           Logout
                         </button>
                       </>
                     ) : (
                       <Link to="/login">Login</Link>
                     )}
                   </div>
                 </nav>
           
           
             </div>

            {/* Hero Section */}
            <section className="corp-hero">
                <div className="corp-hero-content">
                    <div className="golden-line"></div>
                    <div className="corp-title">
                        <SplitText
                            text="Transform Business Challenges"
                            className="corp-heading-primary"
                            delay={50}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            tag="h1"
                            textAlign="left"
                        />
                        <SplitText
                            text="Into Innovation"
                            className="corp-heading-italic"
                            delay={150}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            tag="p"
                            textAlign="left"
                        />
                    </div>
                    <p className="corp-subtitle">
                        Partner with elite startups to accelerate value creation. A curated platform for forward-thinking enterprises to discover, pilot, and scale next-generation solutions.
                    </p>
                    <div className="corp-actions">
                        <button className="btn-gold" onClick={handlePostChallenge}>Post Challenges</button>
                        <button className="btn-outline" onClick={handleViewSolutions}>View Solutions</button>
                    </div>
                </div>

                <div className="corp-hero-visual">
                    {/* Floating Cards simulating the visual from the request */}
                    <div className="stat-card card-1">
                        <h3>500+</h3>
                        <p>Vetted Startups</p>
                    </div>
                    <div className="stat-card card-2">
                        <h3>48</h3>
                        <p>Fortune 500 Partners</p>
                    </div>
                </div>
            </section>

            {/* New Sections */}
            <ValueProposition />
            <HowItWorks />
            <CorporateFooter />

            {/* Modals */}
            {showChallengeModal && (
                <PostChallengeModal
                    isOpen={showChallengeModal}
                    onClose={() => setShowChallengeModal(false)}
                />
            )}

            {showSolutions && (
                <SolutionsList
                    isOpen={showSolutions}
                    onClose={() => setShowSolutions(false)}
                />
            )}
        </div>
    );
};

export default Corporate;
