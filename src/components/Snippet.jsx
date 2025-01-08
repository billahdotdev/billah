import React from 'react';
import '../styles/Snippet.css';

const Snippet = () => {
    return (
        <div className="snippet-container">
            <pre>
                {`// Welcome to my world!
const displayAboutMe = () => {
    const aboutMe = {
        name: 'Masum Billah',
        intro: "I'm a web developer, bringing digital dreams to life.",
        languages: ['JavaScript', 'TypeScript'],
        coreTechnologies: ['MongoDB', 'Express', 'React', 'Node'],
        tools: ['Git', 'Material UI', 'Figma', 'Inkscape', 'and more...'],
        interests: ['Web Technologies', 'Reading', 'Traveling'],
        locations: ['Manila, Philippines', 'Dhaka, Bangladesh'],
        webAddress: 'https://billah.dev',
        contact: {
            email: 'billahdotdev@gmail.com',
            phone: ['+8801713401889', '+639156015542'],
            socialMediaHandle: 'billahdotdev',
        },
    };

    console.log(aboutMe);
};

displayAboutMe();`}
            </pre>
        </div>
    );
};

export default Snippet;
