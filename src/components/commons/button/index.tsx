import React, { memo, CSSProperties, ElementType } from 'react';
import styles from './button.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

interface ElementProps extends React.HTMLAttributes<HTMLElement> {
  style?: CSSProperties;
  animation?: boolean;
  as?: ElementType;
  link?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

const ButtonComponent: React.FC<ElementProps> = memo(
  ({ className, children, animation = false, as: Tag = 'button', onClick, link, disabled = false, ...props }) => {
    const isLink = Tag === 'a';

    return (
      <Tag
        onClick={onClick}
        disabled={disabled}
        className={cx('button', className, { rotate: animation })}
        {...(isLink && { href: link })}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

export default ButtonComponent;
