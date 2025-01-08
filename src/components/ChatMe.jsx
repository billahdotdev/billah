/*
import React, { useState } from 'react';
import '../styles/ChatMe.css';

const ChatMe = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneNumber = '+8801713401889'; // Replace with your WhatsApp number
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message,
        )}`;
        window.open(whatsappLink, '_blank');
        setIsSubmitted(true);
        setMessage(''); // Optionally clear the message after submission

        // Reset the submission status after 3 seconds (3000 milliseconds)
        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
    };

    const handleCloseMessage = () => {
        setIsSubmitted(false);
    };

    return (
        <div className="chat-me">
            <button className="toggle-button" onClick={handleToggle}>
                💬
            </button>
            {isOpen && (
                <div className="chat-me-content">
                    <button className="close-button" onClick={handleToggle}>
                        ✖
                    </button>
                    <p className="chat-me-text">
                        There are times when you need someone to listen or give
                        some advice.
                    </p>
                    <p className="chat-me-text-slot">
                        Book a slot to chat - anything from personal to career,
                        Web Development, Graphic design, Digital Marketing,
                        T-Shirt Business, and Mental Health.
                    </p>

                    <p className="chat-me-text-tee">
                        To get a quicker answer, please write your response
                        below. Thank you
                    </p>
                    {isSubmitted ? (
                        <div className="thank-you-message-container">
                            <p className="thank-you-message">
                                Thank you! Your message has been sent.
                            </p>
                            <button
                                className="close-message-button"
                                onClick={handleCloseMessage}>
                                ✖
                            </button>
                        </div>
                    ) : (
                        <form className="chat-form" onSubmit={handleSubmit}>
                            <textarea
                                placeholder="Type your message here..."
                                className="chat-input"
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }></textarea>
                            <button type="submit" className="send-button">
                                Send from WhatsApp
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatMe;
*/

import React, { useState } from 'react';
import '../styles/ChatMe.css';

const ChatMe = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneNumber = '+8801713401889'; // Replace with your WhatsApp number
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message,
        )}`;
        window.open(whatsappLink, '_blank');
        setIsSubmitted(true);
        setMessage(''); // Optionally clear the message after submission

        // Reset the submission status after 3 seconds (3000 milliseconds)
        setTimeout(() => {
            setIsSubmitted(false);
        }, 3000);
    };

    const handleCloseMessage = () => {
        setIsSubmitted(false);
    };

    return (
        <div className="chat-me">
            <button className="toggle-button" onClick={handleToggle}>
                💬
            </button>
            {isOpen && (
                <div className="chat-me-content">
                    <button className="close-button" onClick={handleToggle}>
                        ✖
                    </button>
                    <div className="chat-me-body">
                        <p className="chat-me-text">
                            Sometimes, you need someone to listen or give some
                            advice.
                        </p>
                        <p className="chat-me-text-slot">
                            Book a slot to chat - anything from personal to
                            career, web development, graphic design, digital
                            marketing, T-shirt business, and mental health.
                        </p>
                        <p className="chat-me-text-tee">
                            For quicker responses, please write your message
                            below. Thank you!
                        </p>
                        {isSubmitted ? (
                            <div className="thank-you-message-container">
                                <p className="thank-you-message">
                                    Thank you! Your message has been sent.
                                </p>
                                <button
                                    className="close-message-button"
                                    onClick={handleCloseMessage}>
                                    ✖
                                </button>
                            </div>
                        ) : (
                            <form className="chat-form" onSubmit={handleSubmit}>
                                <textarea
                                    placeholder="Type your message here..."
                                    className="chat-input"
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }></textarea>
                                <button type="submit" className="send-button">
                                    Send via WhatsApp
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatMe;
