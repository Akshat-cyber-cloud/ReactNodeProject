import React from 'react'
import './style.css'
import Video1 from '../assets/Video_Generation_and_Delivery.mp4'
import Video2 from '../assets/new-message.mp4'
import Video3 from '../assets/profile.mp4'


const StartServices = () => {
    return (
        <section className='benifits'>
            <div className='title'>
                <h1>Featured Section</h1>
            </div>

            <div className="box1">
                <div className="left-media-box">
                    <h2 className='box-heading'>Unlock Direct Access to Corporate Innovation Teams</h2>
                    <p>Showcase your solution to enterprises actively looking for startups.</p>
                    <p>Get partnership invitations, pilot opportunities, and innovation challenge access — without sending a single cold email.</p>
                </div>
                <div className="right-video-box">
                    <video src= {Video1} loop muted autoPlay></video>
                </div>
            </div>

            <div className="box2">
                <div className="left-box">
                    <div className="left-media1-box">
                        <h3>Showcase Your Startup Profile</h3>
                        <p>Present your product, pitch deck, metrics, and team professionally.</p>
                    </div>

                    <div className="right-video1-box">
                         <video src= {Video3} loop muted autoPlay></video>
                    </div>
                </div>

                <div className="right-box">
                    <div className="left-media2-box">
                        <h3>Real-Time Notifications</h3>
                        <p>Stay updated when corporates view your profile, shortlist you, or send collaboration invites.</p>
                    </div>

                    <div className="right-video1-box">
                         <video src= {Video2} loop muted autoPlay></video>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default StartServices