import React from 'react';
import LayoutWrapper from './components/LayoutWrapper';
import PenWrapper from './components/PenWrapper';
import ProfilePhoto from './components/ProfilePhoto';
import SocialMedia from './components/SocialMedia';
import AboutMe from './components/AboutMe';
import MoreAboutMe from './components/MoreAboutMe';
import ChatMe from './components/ChatMe';
import NewGame from './components/NewGame';
import LetsCode from './components/LetsCode';
import DoNothing from './components/DoNothing';
import Works from './components/Works';
import Snippet from './components/Snippet';

const App = () => {
    return (
        <LayoutWrapper>
            <PenWrapper>
                <ProfilePhoto />
                <SocialMedia />
                <AboutMe />
                <MoreAboutMe />
                <ChatMe />
                <NewGame />
                <LetsCode />
                <DoNothing />
                <Works />
                <Snippet />
            </PenWrapper>
        </LayoutWrapper>
    );
};

export default App;
