
import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const Contact = () => {
    const styles = {
        section: {
            padding: '6rem 0 10rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        },
        container: {
            maxWidth: '600px',
            width: '100%',
            padding: '0 1.5rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
        },
        title: {
            fontSize: '3rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
        },
        description: {
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
        },
        ctaButton: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            padding: '1rem 2.5rem',
            background: 'var(--accent-color)',
            color: '#0f172a',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '9999px',
            transition: 'transform 0.2s',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
            textDecoration: 'none',
        }
    };

    return (
        <section id="contact" className="contact-section reveal">
            <div style={styles.container}>
                <h2 style={styles.title}>
                    Get In Touch
                </h2>

                <p style={styles.description}>
                    Creating unique digital experiences is my passion.
                    Whether you have a specific project or just want to talk tech,
                    my inbox is always open.
                </p>

                <a
                    href="mailto:godinezjoel@icloud.com"
                    className="btn-primary"
                >
                    <Mail size={20} />
                    <span>Say Hello</span>
                    <ArrowRight size={20} />
                </a>
            </div>
        </section>
    );
};

export default Contact;
