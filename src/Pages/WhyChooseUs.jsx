import React from 'react'
import './style.css'


const features = [
    {
        title: "Verified Corporates",
        desc: "Work only with trusted, vetted companies ready to collaborate.",
    },
    {
        title: "Smart Matchmaking",
        desc: "We connect you with corporates whose needs align with your solution.",
    },
    {
        title: "Fast Communication",
        desc: "Built-in messaging and updates to speed up partnership decisions.",
    },
    {
        title: "Pilot Opportunities",
        desc: "Apply for innovation challenges and secure paid pilot programs.",
    },
];

const WhyChooseUs = () => {

    return (
        <div>
            <section className="choose-us-section">
                <div className="choose-left">
                    <h2 className="choose-title">Why Choose Us Section</h2>
                    <div className="choose-underline"></div>

                    <div className="choose-grid">
                        {features.map((item, index) => (
                            <div className="choose-card" key={index}>
                                <div className="choose-icon">?</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    )
}

export default WhyChooseUs