import React from 'react';
import '../styles/ProfilePhoto.css';

const ProfilePhoto = () => {
    return (
        <div className="profile-photo-container">
            <img
                className="profile-photo"
                src="https://avatars.githubusercontent.com/u/112099343?v=4"
                alt="Masum Billah"
            />
        </div>
    );
};

export default ProfilePhoto;
