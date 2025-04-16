import React, { useEffect, useState } from 'react';


const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = (): void => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
        >
            ↑
        </button>
    );
};

export default ScrollToTop;
