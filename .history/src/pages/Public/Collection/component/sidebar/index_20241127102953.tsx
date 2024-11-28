import React, { memo } from 'react';
import styles from './sidebar.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const SidebarComponent: React.FC = memo(() => {
  return <div className={cx('sidebar-wrapper')}>test</div>;
});

export default SidebarComponent;
