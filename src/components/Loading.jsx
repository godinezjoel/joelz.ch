import React from 'react';

const Loading = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
            background: 'var(--bg-color)'
        }}>
            <div className="loader"></div>
            <style>{`
                .loader {
                    width: 48px;
                    height: 48px;
                    border: 5px solid var(--surface-color);
                    border-bottom-color: var(--accent-color);
                    border-radius: 50%;
                    display: inline-block;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                }

                @keyframes rotation {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loading;
