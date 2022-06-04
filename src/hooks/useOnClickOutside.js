import { useEffect } from 'react';

export function useOnClickOutside(ref, callback) {
  useEffect(() => {
    const listener = (e) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      callback(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
}
