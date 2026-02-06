import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const styles = {
        section: {
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: '60px',
            position: 'relative',
        },
        title: {
            fontSize: 'dynamic', // handled by CSS ideally, but '4rem' is fine for now
            fontWeight: '800',
            marginBottom: '1.5rem',
            background: 'var(--hero-gradient)', // Dynamic gradient
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
        },
        subtitle: {
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
        },
        button: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2rem',
            backgroundColor: 'var(--accent-color)',
            color: '#0f172a', /* Dark bg color for contrast text */
            fontWeight: '600',
            borderRadius: '9999px', /* Pill shape */
            transition: 'transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s',
            border: 'none',
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)',
        },
        scrollIndicator: {
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            color: 'var(--text-secondary)',
            opacity: 0.7,
        }
    };

    return (
        <section style={styles.section} id="home">
            <style>
                {`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
                    40% {transform: translateY(-10px) translateX(-50%);}
                    60% {transform: translateY(-5px) translateX(-50%);}
                }
                @media (max-width: 768px) {
                    h1 { font-size: 2.5rem !important; }
                }
                @media (min-width: 769px) {
                    h1 { font-size: 4rem !important; }
                }
                `}
            </style>
            <div className="container">
                <div className="fade-in-up">
                    <h1 style={styles.title}>
                        Hi, I'm Joel
                    </h1>
                </div>

                <p className="fade-in-up delay-100" style={styles.subtitle}>
                    17-year-old Software Engineer apprentice at Swiss Post.
                    Navigating the landscape of digital innovation with precision, speed, and flow.
                </p>

                <div className="fade-in-up delay-200">
                    <a href="#projects" className="btn-primary">
                        View My Work
                    </a>
                </div>
            </div>

            <a href="#about" style={styles.scrollIndicator} aria-label="Scroll down">
                <ArrowDown size={32} />
            </a>
        </section>
    );
};

export default Hero;
