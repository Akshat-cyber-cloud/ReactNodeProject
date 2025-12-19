import React from 'react'
import '../index.css'
import FadeIn from './FadeIn';
import { motion } from 'framer-motion';
import Galaxy from './Galaxy';

const Hero = () => {
    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 z-0">
                <Galaxy
                    mouseRepulsion={true}
                    mouseInteraction={true}
                    density={1.5}
                    glowIntensity={0.5}
                    saturation={0.8}
                    hueShift={240}
                />
            </div>

            <section className="hero relative z-10 !bg-transparent pointer-events-none">
                <div className="hero-left pointer-events-auto">
                    <FadeIn delay={0.2} direction="down">
                        <h1>
                            Where <span className="text-gradient">collaboration</span> <br />
                            shapes the <span className="text-gradient">future</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.4} direction="down">
                        <p>
                            We connect innovative startups with enterprises ready to collaborate,
                            invest, and transform ideas into global impact.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.6} direction="up">
                        <div className="hero-btns">
                            <motion.button
                                className="primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = '/startup-signup'}
                            >
                                Join as Startup
                            </motion.button>
                            <motion.button
                                className="secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = '/corporate-signup'}
                            >
                                Join as Corporate
                            </motion.button>
                        </div>
                    </FadeIn>
                </div>

                <div className="hero-right pointer-events-auto">
                    <FadeIn delay={0.8} direction="left">
                        <div className="hero-visual">
                            {/* Main Image */}
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                alt="Collaboration"
                                className="main-hero-img"
                            />

                            {/* Floating Card 1 - Top Right */}
                            <motion.div
                                className="floating-card"
                                style={{ top: '10%', right: '-10%' }}
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="icon">🤝</div>
                                <div className="content">
                                    <h4>500+ Partners</h4>
                                    <p>Global Network</p>
                                </div>
                            </motion.div>

                            {/* Floating Card 2 - Bottom Left */}
                            <motion.div
                                className="floating-card"
                                style={{ bottom: '15%', left: '-15%' }}
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="icon">🚀</div>
                                <div className="content">
                                    <h4>Verified</h4>
                                    <p>Top Startups</p>
                                </div>
                            </motion.div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}

export default Hero