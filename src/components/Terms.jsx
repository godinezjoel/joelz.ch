import React, { useEffect } from 'react';
import { Shield, Info, MapPin, Mail, Github, Linkedin, Instagram } from 'lucide-react';
import TiktokIcon from './TiktokIcon';

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const styles = {
        section: { padding: '8rem 0 4rem' },
        card: {
            maxWidth: '800px',
            margin: '0 auto',
            color: 'var(--text-secondary)'
        },
        header: {
            marginBottom: '2rem',
            borderBottom: '1px solid var(--divider-color)',
            paddingBottom: '1rem'
        },
        title: {
            color: 'var(--text-primary)',
            fontSize: '2rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        contentBlock: {
            marginBottom: '2rem'
        },
        disclaimer: {
            marginTop: '3rem',
            padding: '1.5rem',
            background: 'rgba(56, 189, 248, 0.1)',
            borderRadius: '12px',
            border: '1px solid var(--accent-color)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            color: 'var(--text-primary)'
        }
    };

    return (
        <section style={styles.section}>
            <div className="container">
                <div className="glass-card" style={styles.card}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>
                            <Shield size={32} color="var(--accent-color)" />
                            Terms & Information
                        </h1>
                    </div>

                    <div style={styles.contentBlock}>
                        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>About Me</h2>
                        <p>
                            I'm Joel, a dedicated Software Engineer apprentice at Swiss Post, passionate about creating intuitive and visually stunning digital experiences.
                            This portfolio serves as a showcase of my journey, skills, and projects as I navigate the world of software development.
                        </p>
                    </div>

                    <div style={styles.contentBlock}>
                        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Usage</h2>
                        <p>
                            The content on this website is for informational purposes. Feel free to explore my projects and get in touch if you'd like to collaborate or just say hi!
                        </p>
                    </div>

                    <div style={styles.contentBlock}>
                        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Contact & Socials</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                <MapPin size={20} color="var(--accent-color)" />
                                <span>Based in Bern, Switzerland</span>
                            </div>
                            <a href="mailto:godinezjoel@icloud.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                                <Mail size={20} color="var(--accent-color)" />
                                <span className="hover-text">godinezjoel@icloud.com</span>
                            </a>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                <a href="https://github.com/godinezjoel" target="_blank" rel="noopener noreferrer" className="hover-scale">
                                    <Github size={24} />
                                </a>
                                <a href="https://www.linkedin.com/in/joel-godinez-868085362" target="_blank" rel="noopener noreferrer" className="hover-scale">
                                    <Linkedin size={24} />
                                </a>
                                <a href="https://www.instagram.com/joel_gxd/" target="_blank" rel="noopener noreferrer" className="hover-scale">
                                    <Instagram size={24} />
                                </a>
                                <a href="https://www.tiktok.com/@joel.gxd" target="_blank" rel="noopener noreferrer" className="hover-scale">
                                    <TiktokIcon size={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div style={styles.disclaimer}>
                        <Info size={24} style={{ minWidth: '24px' }} />
                        <div>
                            <strong>Disclaimer:</strong>
                            <p style={{ margin: '0.5rem 0 0' }}>
                                This application was architected and built with the assistance of <strong>Antigravity</strong>, an advanced AI coding agent.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Terms;
