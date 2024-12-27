// AnnouncementBar.tsx
import { memo } from 'react';

const LoaderComponent = memo(() => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  );
});

export default LoaderComponent;
