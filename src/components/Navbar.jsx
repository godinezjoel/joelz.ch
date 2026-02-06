import React, { useState, useEffect } from 'react';
import { Terminal, Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking a link
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <a href="/" className="nav-logo" onClick={closeMenu}>
                    <Terminal size={24} color="#38bdf8" />
                    Dev.Joel
                </a>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li><a href="/#about" className="nav-link" onClick={closeMenu}>About</a></li>
                    <li><a href="/#projects" className="nav-link" onClick={closeMenu}>Projects</a></li>
                    <li><a href="/#contact" className="nav-link" onClick={closeMenu}>Contact</a></li>

                    <li>
                        <button
                            onClick={() => {
                                toggleTheme();
                                closeMenu();
                            }}
                            className="theme-toggle-btn"
                            aria-label="Toggle Light/Dark Mode"
                            title="Toggle Light/Dark Mode"
                        >
                            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
