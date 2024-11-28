// AnnouncementBar.tsx
import React, { memo, CSSProperties } from 'react';
import styles from './button.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: CSSProperties;
  animation?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = memo(({ className, children, animation = false, ...props }) => {
  return (
    <button className={cx('button', className, { rotate: animation })} {...props}>
      {children}
    </button>
  );
});

export default ButtonComponent;
