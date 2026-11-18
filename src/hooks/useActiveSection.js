import { useEffect, useState } from 'react';

// Watches page sections and returns the id of the one currently in view,
// so the navbar can highlight the matching link.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          // Scrolled back above the first section (the hero): no link is active.
          else if (entry.target === sections[0] && entry.boundingClientRect.top > 0) setActive(null);
        });
      },
      // A thin band near the top third of the screen decides the active section.
      { rootMargin: '-35% 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
