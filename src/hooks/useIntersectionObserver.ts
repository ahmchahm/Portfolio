import { useEffect, useRef, useState } from 'react';

interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionOptions = {}
) => {
  const { freezeOnceVisible = false, ...intersectionOptions } = options;
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        hasTriggered.current = true;

        if (freezeOnceVisible) {
          observer.unobserve(entry.target);
        }
      } else if (!freezeOnceVisible) {
        setIsVisible(false);
      }
    }, {
      threshold: 0.1,
      ...intersectionOptions,
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [freezeOnceVisible, intersectionOptions]);

  return isVisible;
};

export default useIntersectionObserver;
