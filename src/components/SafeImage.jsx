import { useState } from 'react';
import { ImageOff } from 'lucide-react';

// An <img> that swaps to a soft placeholder if the file fails to load,
// so a broken image never breaks the layout.
function SafeImage({ src, alt, className = '', ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <ImageOff aria-hidden="true" />
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
}

export default SafeImage;
