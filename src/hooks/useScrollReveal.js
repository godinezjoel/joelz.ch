import { useEffect } from 'react';

const useScrollReveal = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Select all elements that need revealing
        const animatedElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

        // Wait a tick to ensure elements are mounted/rendered
        setTimeout(() => {
            const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
            elements.forEach(el => observer.observe(el));
        }, 100);

        return () => {
            observer.disconnect();
        };
    }, []); // Run on mount (which happens every time Home is visited)
};

export default useScrollReveal;
