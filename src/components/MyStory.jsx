import React, { useState } from 'react';
import '../styles/MyStory.css';


const MyStory = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <div className="my-story-container">
            {!clicked ? (
                <a
                    href="#"
                    className="my-story-button"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}>
                    My Story
                </a>
            ) : (
                <div className="my-story-about">
                    <div className="my-story-text-container">
                        <p className="my-story-about-text">
                            🙂 I am passionate about JavaScript and web
                            technologies. Before the pandemic, I was just a
                            struggling entrepreneur in the clothing industry.
                            'GARMENTIK' is a company where I hustled as a
                            rainmaker. My business had its ups and downs, which
                            were stressful, but I was learning something new
                            every day. During the pandemic, I decided to bring
                            my passion into the business. Nowadays, two roles in
                            my real-life game are:
                        </p>
                        <div className="my-story-button-container">
                            <button
                                className="my-story-button-garmentik"
                                onClick={() =>
                                    window.open(
                                        'https://garmentik.com',
                                        '_blank',
                                    )
                                }>
                                GARMENTIK
                            </button>
                            <button
                                className="my-story-button-webdev"
                                onClick={() =>
                                    window.open(
                                        'https://github.com/billahdotdev',
                                        '_blank',
                                    )
                                }>
                                WEB DEVELOPMENT
                            </button>
                        </div>
                        <button className="my-story-button-back" onClick={handleClick}>
                            ←
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyStory;
