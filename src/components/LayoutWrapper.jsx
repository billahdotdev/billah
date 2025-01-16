import React from 'react';
import '../styles/layoutWrapper.css';

const LayoutWrapper = ({ children }) => {
    return (
        <div className="layout_wrapper">
            <a className="profile" href="https://billah.dev">
                Masum Billah
            </a>
            <p className="pen">Web Developer| Founder of GARMENTIK</p>
            <p className="made">
                Built by dreamers: Masum Billah. For dreamers. Deeply indebted
                to the individuals who I learned from. 2025 v1.0 // no right
                reserved!
            </p>
            {children}
        </div>
    );
};

export default LayoutWrapper;
