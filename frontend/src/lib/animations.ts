import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function usePageEnterAnimation(isLoading = false, deps: any[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;
    
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Find elements to animate
      const headers = containerRef.current?.querySelectorAll('.gsap-header');
      const filters = containerRef.current?.querySelectorAll('.gsap-filters');
      const cards = containerRef.current?.querySelectorAll('.gsap-card');
      
      const tl = gsap.timeline();
      
      if (headers?.length) {
        tl.fromTo(headers, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0);
      }
      
      if (filters?.length) {
        tl.fromTo(filters, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.1);
      }
      
      if (cards?.length) {
        tl.fromTo(cards, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }, 0.2);
      }
    });

    return () => mm.revert();
  }, [isLoading, ...deps]);

  return containerRef;
}
