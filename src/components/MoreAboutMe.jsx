import React, { useState } from 'react';
import '../styles/MoreAboutMe.css';

const MoreAboutMe = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="more-about-me">
            <button className="toggle-button" onClick={handleToggle}>
                {isOpen ? '−' : '+'}
            </button>
            {isOpen && (
                <div className="more-about-me-content">
                    <p className="more-about-me-text">
                        I Speak: English, Bangla(Native), Taglish, and of course
                        JavaScript!
                    </p>
                    <p className="more-about-me-text-2">
                        Certification: I'm a Bangladesh University of
                        Engineering and Technology (BUET) certified full-stack
                        web developer on a journey of modern web mastery at the
                        University of Helsinki.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MoreAboutMe;
