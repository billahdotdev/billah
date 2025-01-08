import React, { useEffect } from 'react';
import '../styles/Works.css';

const Works = () => {
    useEffect(() => {
        // Function to track the cursor movement
        const cursorText = document.querySelector('.cursor-text');
        const worksContainer = document.querySelector('.works-container');

        // Handle mouse movement
        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            cursorText.style.left = `${mouseX + 10}px`;
            cursorText.style.top = `${mouseY + 10}px`;
        };

        // Add mousemove event listener to works-container to restrict the cursor effect to this section
        worksContainer.addEventListener('mousemove', handleMouseMove);

        // Cleanup event listener on component unmount
        return () => {
            worksContainer.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="works-container">
            <h2>Web Development Topics are currently trending.</h2>
            <div className="cards-container">
                {/* Neomorphic Design Card */}
                <div className="card neomorphic-card">
                    <div className="card-content">
                        <h3>Neomorphic Design</h3>
                        <p>
                            Mastering modern UI design with soft shadows and
                            smooth gradients.
                        </p>
                        <span className="label">UI/UX Design</span>
                    </div>
                </div>

                {/* Responsive Design Card */}
                <div className="card responsive-card">
                    <div className="card-content">
                        <h3>Responsive Design</h3>
                        <p>Optimizing user experience across all devices.</p>
                        <span className="label">Mobile-First</span>
                    </div>
                </div>

                {/* Performance Optimization Card */}
                <div className="card performance-card">
                    <div className="card-content">
                        <h3>Performance Optimization</h3>
                        <p>
                            Speeding up websites for a lightning-fast user
                            experience.
                        </p>
                        <span className="label">Speed</span>
                    </div>
                </div>

                {/* Interactive Front-End Card */}
                <div className="card interactive-card">
                    <div className="card-content">
                        <h3>Interactive Front-End</h3>
                        <p>
                            Creating engaging and interactive user interfaces
                            with JavaScript.
                        </p>
                        <span className="label">React</span>
                    </div>
                </div>

                {/* Progressive Web Apps (PWA) Card */}
                <div className="card pwa-card">
                    <div className="card-content">
                        <h3>Progressive Web Apps</h3>
                        <p>
                            Bringing native app experiences to the web with
                            offline capabilities.
                        </p>
                        <span className="label">PWA</span>
                    </div>
                </div>

                {/* API Integration Card */}
                <div className="card api-card">
                    <div className="card-content">
                        <h3>API Integration</h3>
                        <p>
                            Connecting applications to real-time data through
                            APIs.
                        </p>
                        <span className="label">Data</span>
                    </div>
                </div>
            </div>

            {/* Cursor Text */}
            <div className="cursor-text">{"< Let's Work Together / >"}</div>
        </section>
    );
};

export default Works;
