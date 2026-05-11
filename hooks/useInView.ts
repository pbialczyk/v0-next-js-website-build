'use client';

import { useEffect, useRef, useState } from 'react';

// Shared IntersectionObserver to avoid creating one per element
// Reduces forced reflows and observer overhead on pages with many animated cards
type Callback = (isIntersecting: boolean) => void;
const callbacks = new WeakMap<Element, Callback>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = callbacks.get(entry.target);
          if (cb) {
            cb(true);
            sharedObserver?.unobserve(entry.target);
            callbacks.delete(entry.target);
          }
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px 100px 0px' }
  );
  return sharedObserver;
}

export function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getObserver();
    callbacks.set(el, () => setInView(true));
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, []);

  return { ref, inView };
}
