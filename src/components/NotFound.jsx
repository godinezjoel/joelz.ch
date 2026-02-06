
import React from 'react';
import { Home, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const styles = {
        container: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
        },
        errorCode: {
            fontSize: '8rem',
            fontWeight: '900',
            color: 'var(--accent-color)',
            marginBottom: '1rem',
            opacity: 0.8,
        },
        message: {
            fontSize: '2rem',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
        },
        subMessage: {
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '500px',
        },
        button: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 2rem',
            backgroundColor: 'var(--accent-color)',
            color: '#0f172a',
            borderRadius: '9999px',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'transform 0.2s',
        }
    };

    return (
        <section style={styles.container}>
            <div className="fade-in-up">
                <div style={styles.errorCode}>404</div>
                <h2 style={styles.message}>Page Not Found</h2>
                <p style={styles.subMessage}>
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="btn-primary"
                >
                    <Home size={18} />
                    Go Home
                </Link>
            </div>
        </section>
    );
};

export default NotFound;
