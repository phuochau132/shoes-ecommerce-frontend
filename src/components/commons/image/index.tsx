import React, { useState, memo } from 'react';
import styles from './image.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
interface ImageComponentProps {
  src: string;
  aspect_ratio?: string;
}
const cx = bindClassNames(styles);
const ImageComponent: React.FC<ImageComponentProps> = memo(({ src, aspect_ratio = '40%' }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cx('adaptive-height', 'animation', 'border')} style={{ paddingTop: aspect_ratio }}>
      <a href="#" className={cx('image')}>
        {isLoading && <span className="loader"></span>}
        <img
          src={src}
          sizes="100vw"
          alt=""
          loading="lazy"
          onLoad={handleImageLoad}
          className={cx({ 'image-hidden': isLoading })}
        />
      </a>
    </div>
  );
});

export default ImageComponent;
