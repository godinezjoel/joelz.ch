import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import useScrollReveal from '../hooks/useScrollReveal';

const Home = () => {
    useScrollReveal();
    const location = useLocation();
    const isScrolling = useRef(false);

    // Scroll to section based on URL path
    useEffect(() => {
        const path = location.pathname.substring(1);
        if (['about', 'projects', 'contact'].includes(path)) {
            const el = document.getElementById(path);
            if (el) {
                isScrolling.current = true;
                el.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { isScrolling.current = false; }, 1000);
            }
        } else if (path === '') {
            const el = document.getElementById('home');
            if (el) {
                isScrolling.current = true;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => { isScrolling.current = false; }, 1000);
            }
        }
    }, [location.pathname]);

    // Update URL bar based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (isScrolling.current) return;

            const sections = ['contact', 'projects', 'about', 'home'];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition) {
                    const newPath = section === 'home' ? '/' : `/${section}`;
                    if (window.location.pathname !== newPath) {
                        window.history.replaceState(null, '', newPath);
                    }
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
