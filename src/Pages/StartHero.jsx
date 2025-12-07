import React from 'react'
import { Link } from "react-router-dom";
import './style.css'

const StartHero = () => {
    return (
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
                    <Link to="/apply" className="btn-primary">
                        Join the Network
                    </Link>

                    <Link to="/how-it-works" className="btn-secondary">
                        How It Works
                    </Link>
                </div>

                <p className='small-info'>
                    Trusted by Founders building the future
                </p>
            </div>

        </section>
    )
}

export default StartHero