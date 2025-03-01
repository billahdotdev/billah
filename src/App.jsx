import React from 'react';
import LayoutWrapper from './components/LayoutWrapper';
import PenWrapper from './components/PenWrapper';
import Component from './components/Component';

const App = () => {
    return (
        <LayoutWrapper>
            <PenWrapper>
                <Component />
            </PenWrapper>
        </LayoutWrapper>
    );
};

export default App;
