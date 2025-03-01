import React from 'react';
import LayoutWrapper from './components/LayoutWrapper';
import PenWrapper from './components/PenWrapper';
import Component from './components/Component';
import Neo from './components/Neo';

const App = () => {
    return (
        <LayoutWrapper>
            <PenWrapper>
                <Component />
                <Neo />
            </PenWrapper>
        </LayoutWrapper>
    );
};

export default App;
