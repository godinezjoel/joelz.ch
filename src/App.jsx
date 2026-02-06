import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
const Home = React.lazy(() => import('./components/Home'));
const Terms = React.lazy(() => import('./components/Terms'));
const NotFound = React.lazy(() => import('./components/NotFound'));
import Footer from './components/Footer';
import Background from './components/Background';
import Loading from './components/Loading';

function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className="app">
            <Background theme={theme} />
            <BrowserRouter>
                <Navbar
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
                <React.Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </React.Suspense>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
