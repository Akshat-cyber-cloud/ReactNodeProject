import React from 'react';
import './style.css';

const reviews = [
    {
        name: "Aarav Sharma",
        country: "India",
        stars: 5,
        review: "CollabX helped us connect with a major logistics company within a week. Super smooth!",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
        name: "Sophia Williams",
        country: "USA",
        stars: 4,
        review: "We secured a pilot project faster than expected. Great experience!",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Liam Johnson",
        country: "UK",
        stars: 5,
        review: "The matchmaking feature is insanely accurate. Saved us so much time.",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg"
    },
    {
        name: "Mia Chen",
        country: "Singapore",
        stars: 5,
        review: "We loved how easy it was to present our startup and reach corporates.",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
        name: "Yuki Tanaka",
        country: "Japan",
        stars: 4,
        review: "Simple, clean interface and quick responses from corporate teams.",
        avatar: "https://randomuser.me/api/portraits/men/59.jpg"
    }
];

const Review = () => {
    return (
        <div className='review-section'>
            <div className='review-heading'>
                <h1>Review Section</h1>
                <div className='review-underline'></div>
            </div>

            <div className='review-cards-wrapper'>
                {reviews.map((item, index) => (
                    <div className="review-card" key={index}>

                        <div className="stars">
                            {"★".repeat(item.stars)}
                            {"☆".repeat(5 - item.stars)}
                        </div>

                        <p className='review-text'>{item.review}</p>


                        <div className="review-footer">
                            <img src={item.avatar} className="avatar" alt="profile" />
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.country}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;
