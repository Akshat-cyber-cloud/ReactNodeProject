import React from 'react' // Startup Features Section
import './style.css'
import Video1 from '../assets/Video_Generation_and_Delivery.mp4'
import Video2 from '../assets/new-message.mp4'
import Video3 from '../assets/profile.mp4'
import SplitText from '../Corporates/SplitText';


const StartServices = () => {
    return (
        <section className='benifits'>
            <div className='title'>
                <SplitText text="Featured Section" tag="h1" />
            </div>

            <div className="box1">
                <div className="left-media-box">
                    <SplitText
                        text="Unlock Direct Access to Corporate Innovation Teams"
                        tag="h2"
                        className='box-heading'
                        textAlign='left'
                    />
                    <p>Showcase your solution to enterprises actively looking for startups.</p>
                    <p>Get partnership invitations, pilot opportunities, and innovation challenge access — without sending a single cold email.</p>
                </div>
                <div className="right-video-box">
                    <video src={Video1} loop muted autoPlay></video>
                </div>
            </div>

            <div className="box2">
                <div className="left-box">
                    <div className="left-media1-box">
                        <SplitText text="Showcase Your Startup Profile" tag="h3" textAlign='left' />
                        <p>Present your product, pitch deck, metrics, and team professionally.</p>
                    </div>

                    <div className="right-video1-box">
                        <video src={Video3} loop muted autoPlay></video>
                    </div>
                </div>

                <div className="right-box">
                    <div className="left-media2-box">
                        <SplitText text="Real-Time Notifications" tag="h3" textAlign='left' />
                        <p>Stay updated when corporates view your profile, shortlist you, or send collaboration invites.</p>
                    </div>

                    <div className="right-video1-box">
                        <video src={Video2} loop muted autoPlay></video>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartServices