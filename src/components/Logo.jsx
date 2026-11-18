// Easy Nest brand mark: a simple roof line sheltering a "nest" curve.
function Logo({ onClick }) {
  return (
    <a href="#home" className="logo" onClick={onClick} aria-label="Easy Nest home">
      <svg className="logo__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill="#2563EB" />
        <path d="M10 19.5 20 11l10 8.5" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5 22.5c1.8 3.6 4 5.4 6.5 5.4s4.7-1.8 6.5-5.4" stroke="#93C5FD" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
      <span className="logo__text">
        Easy<span>Nest</span>
      </span>
    </a>
  );
}

export default Logo;
