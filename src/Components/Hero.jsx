import React from 'react'
import '../index.css'
import { div, section } from 'framer-motion/client'
import Aurora from './Aurora';

const Hero = () => {
    return (
        <div className='aurora-bg'>
            <section className="hero">
                <div className="hero-left">
                    <h1>Where <br /> collaboration <br />shapes the future</h1>
                    <p>
                        We connect innovative startups with enterprises ready to collaborate,
                        invest, and transform ideas into global impact.
                    </p>

                    <div className="hero-btns">
                        <button className="primary">Join as Startup</button>
                        <button className="secondary">Join as Corporate</button>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-slices">

                        <img
                            src="https://images.unsplash.com/photo-1665211097503-ca91faa3b5ac?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="slice slice1"
                            alt="hero"
                        />

                        <img
                            src="https://images.unsplash.com/photo-1665211097503-ca91faa3b5ac?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="slice slice2"
                            alt="hero"
                        />

                        <div className="slice-group">
                            <img
                                src="https://images.unsplash.com/photo-1665211097503-ca91faa3b5ac?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="slice slice3a"
                                alt="hero"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1665211097503-ca91faa3b5ac?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="slice slice3b"
                                alt="hero"
                            />
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1665211097503-ca91faa3b5ac?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="slice slice4"
                            alt="hero"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1665211097503-ca91faa3b5ac?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="slice slice5"
                            alt="hero"
                        />

                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero