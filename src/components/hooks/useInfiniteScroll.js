import { useEffect } from 'react';

const useInfiniteScroll = (callback) => {
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        observer.observe(document.getElementById('infinite-scroll-trigger'));

        return () => observer.disconnect();
    }, [callback]);
};

export default useInfiniteScroll;
