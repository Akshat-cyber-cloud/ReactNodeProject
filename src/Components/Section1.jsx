import React from "react";
import "../index.css";

const Section1 = () => {
  return (
    <section className="about-section">

      {/* LEFT SIDE */}
      <div className="about-left">

        {/* Stats Card */}
        <div className="stats-card">
          <h3>30,000+</h3>
          <p>Active collaborations initiated on our platform</p>

          <div className="avatars">
            <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="" />
            <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="" />
            <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="" />
            <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="" />
          </div>
        </div>

        {/* Image Cards */}
        <div className="image-column">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
            className="about-img big"
            alt="startup"
          />
          <img
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
            className="about-img small"
            alt="team"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="about-right">
        <p className="mini-title">A BIT</p>
        <h2 className="about-title">ABOUT US</h2>

        <p className="about-description">
          We are the collaboration hub connecting ambitious startups with global
          enterprises. From partnerships and funding to innovation initiatives,
          we foster relationships that turn ideas into reality.
        </p>

        <button className="cta-btn">EXPLORE MORE</button>
      </div>

    </section>
  );
};

export default Section1;
