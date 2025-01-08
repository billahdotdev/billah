import React from 'react';
import '../styles/SocialMedia.css';
import { FaGithub, FaXTwitter, FaLinkedin, FaPinterest } from 'react-icons/fa6'; // Using FontAwesome 6
import logo from '../assets/logo.svg'; // Import your logo

const SocialMedia = () => {
    return (
        <div className="social-icons">
            <a
                href="https://github.com/billahdotdev"
                target="_blank"
                rel="noopener noreferrer">
                <FaGithub />
            </a>
            <a
                href="https://x.com/billahdotdev"
                target="_blank"
                rel="noopener noreferrer">
                <FaXTwitter />
            </a>
            <a
                href="https://www.linkedin.com/in/billahdotdev"
                target="_blank"
                rel="noopener noreferrer">
                <FaLinkedin />
            </a>
            <a
                href="https://www.pinterest.com/billahdotdev"
                target="_blank"
                rel="noopener noreferrer">
                <FaPinterest />
            </a>
            <a
                href="https://www.garmentik.com"
                target="_blank"
                rel="noopener noreferrer"
                className="playful-icon">
                <img src={logo} alt="Garmentik Logo" />
            </a>
        </div>
    );
};

export default SocialMedia;
