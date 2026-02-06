import React from 'react';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import useScrollReveal from '../hooks/useScrollReveal';

const Home = () => {
    useScrollReveal();

    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            <Hero />
            <About />
            <Projects />
            <Contact />
        </div>
    );
};

export default Home;
