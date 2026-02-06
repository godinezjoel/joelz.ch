import React from 'react';
import { Heart, Github, Instagram, Linkedin } from 'lucide-react';
import TiktokIcon from './TiktokIcon';
import { Link } from 'react-router-dom';

const Footer = () => {
    const styles = {
        footer: {
            padding: '4rem 0 2rem',
            textAlign: 'center',
            borderTop: '1px solid var(--border-color)',
            marginTop: '4rem',
            background: 'var(--surface-color)'
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
        },
        socials: {
            display: 'flex',
            gap: '1.5rem',
            margin: '1rem 0'
        },
        madeWith: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--text-secondary)',
            fontSize: '1rem'
        },
        heart: {
            color: '#ef4444', // Red color for heart
            fill: '#ef4444'
        },
        links: {
            display: 'flex',
            gap: '2rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
        },
        linkItem: {
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            transition: 'color 0.2s'
        },
        copyright: {
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            opacity: 0.7
        }
    };

    return (
        <footer style={styles.footer}>
            <div className="container" style={styles.container}>

                {/* Made With */}
                <div style={styles.madeWith}>
                    Made with <Heart size={16} style={styles.heart} /> by Joel Godinez
                </div>

                {/* Social Links (Duplicated from About) */}
                <div style={styles.socials}>
                    <a href="https://github.com/godinezjoel" target="_blank" rel="noopener noreferrer" className="hover-scale">
                        <Github size={20} />
                    </a>
                    <a href="https://www.instagram.com/joel_gxd/" target="_blank" rel="noopener noreferrer" className="hover-scale">
                        <Instagram size={20} />
                    </a>
                    <a href="https://www.tiktok.com/@joel.gxd" target="_blank" rel="noopener noreferrer" className="hover-scale">
                        <TiktokIcon size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/joel-godinez-868085362" target="_blank" rel="noopener noreferrer" className="hover-scale">
                        <Linkedin size={20} />
                    </a>
                </div>

                {/* Footer Links */}
                <div style={styles.links}>
                    <Link to="/" style={styles.linkItem} onMouseEnter={e => e.target.style.color = 'var(--accent-color)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Home</Link>
                    <Link to="/terms" style={styles.linkItem} onMouseEnter={e => e.target.style.color = 'var(--accent-color)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Terms & Info</Link>
                </div>

                <div style={styles.copyright}>
                    &copy; {new Date().getFullYear()} Joel Godinez. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
