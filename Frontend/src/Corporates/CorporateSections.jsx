import React from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* --- Value Proposition Section --- */
export const ValueProposition = () => {
    const features = [
        {
            num: "01",
            title: "Access Innovation",
            desc: "Discover breakthrough technologies from vetted startups before they hit the mainstream market. Our scouting engine filters the noise to find your signal."
        },
        {
            num: "02",
            title: "De-risk Pilots",
            desc: "Run controlled proofs-of-concept with our structured framework. We handle the compliance, legal, and operational overhead so you focus on results."
        },
        {
            num: "03",
            title: "Accelerate Growth",
            desc: "Fast-track digital transformation by integrating ready-to-scale solutions. Turn years of R&D into months of implementation."
        }
    ];

    return (
        <section className="corp-section bg-dark">
            <div className="corp-container">
                <h2 className="section-title text-left">The Enterprise Advantage</h2>
                <div className="advantage-list">
                    {features.map((f, i) => (
                        <div key={i} className="advantage-row">
                            <span className="adv-number">{f.num}</span>
                            <div className="adv-content">
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                            <div className="adv-arrow">→</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* --- How It Works Section (Horizontal Scroll) --- */
export const HowItWorks = () => {
    const sectionRef = React.useRef(null);
    const triggerRef = React.useRef(null);

    const steps = [
        {
            id: "01",
            title: "Define the Challenge",
            desc: "Articulate your problem statement. We help translate internal bottlenecks into clear opportunity briefs for the startup ecosystem."
        },
        {
            id: "02",
            title: "Curated Matching",
            desc: "Our AI-driven matching engine paired with expert analysts identifies the top 1% of startups that fit your technical and strategic criteria."
        },
        {
            id: "03",
            title: "Pilot & Scale",
            desc: "Launch rapid pilots with standardized frameworks. Measure impact, validate KPIs, and see immediate enterprise value."
        },
        {
            id: "04",
            title: "Enterprise Adoption",
            desc: "Seamlessly integrate successful pilots into your core infrastructure with our ongoing support and scaling playbooks."
        }
    ];

    useGSAP(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: "-300vw", // Move left by 3 full viewports (since we have 4 items, 4-1 = 3)
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=2000", // Scroll distance
                    scrub: 0.6,
                    pin: true,
                },
            }
        );
        return () => {
            pin.kill();
        };
    }, { scope: triggerRef });

    return (
        <section className="scroll-section-outer" ref={triggerRef}>
            <div ref={sectionRef} className="scroll-section-inner">
                <div className="scroll-panel intro-panel">
                    <div className="intro-content">
                        <h2>Seamless<br />Integration</h2>
                        <p className="intro-desc">
                            Bridging the gap between corporate scale and startup speed.
                            Our process is designed to minimize friction and maximize impact,
                            turning potential disruptions into competitive advantages.
                        </p>
                        <div className="scroll-indicator">
                            <span>Explore the Journey</span>
                            <div className="arrow-right">→</div>
                        </div>
                    </div>
                </div>
                {steps.map((s, i) => (
                    <div key={i} className="scroll-panel step-panel">
                        <div className="panel-content">
                            <span className="panel-id">{s.id}</span>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

/* --- Footer --- */
export const CorporateFooter = () => {
    return (
        <footer className="corp-footer">
            <div className="corp-container footer-content">
                <div className="footer-brand">
                    <h3>CollabX <span>Enterprise</span></h3>
                    <p>Bridging the gap between corporate scale and startup speed.</p>
                </div>
                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/corporate">Corporates</Link>
                    <Link to="/startup">Startups</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} CollabX. All rights reserved.
            </div>
        </footer>
    );
};
