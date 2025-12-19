import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import PostSolutionModal from '../Components/PostSolutionModal';
import OpportunitiesList from '../Components/OpportunitiesList';
import './style.css'

const StartHero = () => {
    const { isAuthenticated, userType } = useAuth();
    const [showSolutionModal, setShowSolutionModal] = useState(false);
    const [showOpportunities, setShowOpportunities] = useState(false);

    const handlePostSolution = () => {
        if (isAuthenticated && userType === 'startup') {
            setShowSolutionModal(true);
        } else {
            alert('Please login as a startup to post solutions');
        }
    };

    const handleExploreOpportunities = () => {
        setShowOpportunities(true);
    };

    return (
        <>
            <section className='hero1'>
                <div className="left">
                    <div className="tag-line">
                        <span>For Startups</span>
                        <span className='badge'>Opportunity Meets Innovation</span>
                    </div>

                    <h1>
                        Unlock Enterprise Partnerships <br /> & Scale Your Startup Faster
                    </h1>

                    <p>
                        Connect directly with corporates seeking innovative solutions.
                        Pitch, collaborate and grow—without endless cold outreach.
                    </p>

                    <div className="cta-row">
                        <button onClick={handlePostSolution} className="btn-primary">
                            Post Solution
                        </button>

                        <button onClick={handleExploreOpportunities} className="btn-secondary">
                            Explore Opportunities
                        </button>
                    </div>

                    <p className='small-info'>
                        Trusted by Founders building the future
                    </p>
                </div>

            </section>

            {showSolutionModal && (
                <PostSolutionModal
                    isOpen={showSolutionModal}
                    onClose={() => setShowSolutionModal(false)}
                />
            )}

            {showOpportunities && (
                <OpportunitiesList
                    isOpen={showOpportunities}
                    onClose={() => setShowOpportunities(false)}
                />
            )}
        </>
    )
}

export default StartHero