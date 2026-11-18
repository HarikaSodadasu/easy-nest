import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

// Wraps any content and fades it up when it scrolls into view.
// `delay` (ms) lets cards in a grid appear one after another.
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  const [settled, setSettled] = useState(false);

  // Once the entrance animation has finished, drop the delay so hover
  // effects on the element respond instantly.
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setSettled(true), delay + 850);
    return () => clearTimeout(timer);
  }, [inView, delay]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={settled ? undefined : { transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
