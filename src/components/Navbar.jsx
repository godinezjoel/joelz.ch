import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    Joelz Portfolio
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link to="/about" className="nav-link" onClick={closeMenu}>About</Link></li>
                    <li><Link to="/projects" className="nav-link" onClick={closeMenu}>Projects</Link></li>
                    <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>

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
