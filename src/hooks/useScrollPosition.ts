import { useEffect, useRef } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  progress: number;
}

export const useScrollPosition = () => {
  const scrollPosition = useRef<ScrollPosition>({ x: 0, y: 0, progress: 0 });

  useEffect(() => {
    const handleScroll = () => {
      scrollPosition.current.x = window.scrollX;
      scrollPosition.current.y = window.scrollY;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollPosition.current.progress = scrollHeight > 0 ? scrollPosition.current.y / scrollHeight : 0;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition.current;
};

export default useScrollPosition;
