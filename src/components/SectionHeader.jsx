import Reveal from './Reveal';

// Consistent eyebrow + title + subtitle block used at the top of each section.
function SectionHeader({ eyebrow, title, subtitle, align = 'center', children }) {
  return (
    <Reveal className={`section-header ${align === 'left' ? 'section-header--left' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {children}
    </Reveal>
  );
}

export default SectionHeader;
