// AnnouncementBar.tsx
import React, { memo, CSSProperties } from 'react';
import styles from './input.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

interface InputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: CSSProperties;
  placeholder?: string;
}

const InputComponent: React.FC<InputComponentProps> = memo(({ className, placeholder, ...props }) => {
  return <input placeholder={placeholder} className={cx('input', className)} type="text" {...props} />;
});

export default InputComponent;
