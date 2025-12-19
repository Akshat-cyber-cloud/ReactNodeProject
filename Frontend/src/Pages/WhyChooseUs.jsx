import React from 'react'
import './style.css'
import SplitText from '../Corporates/SplitText';


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
                    <div className="choose-title">
                        <SplitText text="Why Choose Us Section" tag="h2" className="text-black" />
                    </div>
                    <div className="choose-underline"></div>

                    <div className="choose-grid">
                        {features.map((item, index) => (
                            <div className="choose-card" key={index}>
                                <div className="choose-icon">?</div>
                                <SplitText
                                    text={item.title}
                                    tag="h3"
                                    delay={100 + (index * 50)}
                                    className="text-black"
                                />
                                <p style={{ color: 'white' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    )
}

export default WhyChooseUs