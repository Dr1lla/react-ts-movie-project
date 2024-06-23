// src/components/PosterPreview/PosterPreview.tsx
import React, { FC } from 'react';
import './PosterPreview.css';

interface PosterPreviewProps {
    imageUrl: string;
}

const PosterPreview: FC<PosterPreviewProps> = ({ imageUrl }) => {
    const fullImageUrl = `https://image.tmdb.org/t/p/w500/${imageUrl}`;
    return (
        <div className="poster-preview">
            <img src={fullImageUrl} alt="Movie Poster" />
        </div>
    );
};

export default PosterPreview;
