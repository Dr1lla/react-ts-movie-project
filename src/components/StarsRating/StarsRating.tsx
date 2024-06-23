import React, { FC } from 'react';
import './StarsRating.css';

interface StarsRatingProps {
    rating: number;
}

const StarsRating: FC<StarsRatingProps> = ({ rating }) => {
    const filledStars = Math.round(rating / 1); // Rating is out of 10, converting to 5 stars
    const stars = Array.from({ length: 10 }, (_, index) => index < filledStars);

    return (
        <div className="stars-rating">
            {stars.map((filled, index) => (
                <span key={index} className={filled ? 'star filled' : 'star'}>★</span>
            ))}
        </div>
    );
};

export default StarsRating;