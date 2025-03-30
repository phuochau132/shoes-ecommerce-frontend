// AnnouncementBar.tsx
import { memo } from 'react';

const LoaderComponent = memo((className) => {
  return (
    <div className={`loader-wrapper ${className ? className : ''}`}>
      <div className="loader"></div>
    </div>
  );
});

export default LoaderComponent;
