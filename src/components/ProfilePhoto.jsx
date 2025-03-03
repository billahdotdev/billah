import React, { useState, useEffect } from 'react';
import '../styles/ProfilePhoto.css';


const ProfilePhoto = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`profile-photo-container ${isVisible ? 'visible' : ''}`}>
            <div className="profile-photo-wrapper">
                <img
                    className="profile-photo"
                    src="https://avatars.githubusercontent.com/u/112099343?v=4"
                    alt="Masum Billah"
                />
               
            </div>
        </div>
    );
};

export default ProfilePhoto;