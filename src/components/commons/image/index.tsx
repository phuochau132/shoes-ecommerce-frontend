// AnnouncementBar.tsx
import React, { memo, CSSProperties } from 'react';
import styles from './image.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ImageComponentProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  style?: CSSProperties;
  aspect_ratio?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = memo(({ src, aspect_ratio = '40%' }) => {
  return (
    <div className={cx('adaptive-height', 'animation')} style={{ paddingTop: aspect_ratio }}>
      <a href="#" className={cx('image')}>
        <img src={src} sizes="100vw" alt="" loading="lazy" />
      </a>
    </div>
  );
});

export default ImageComponent;
