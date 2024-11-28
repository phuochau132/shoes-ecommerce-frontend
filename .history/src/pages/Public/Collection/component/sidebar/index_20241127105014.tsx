import React, { memo } from 'react';
import styles from './sidebar.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import CollapsibleBlock from '@/components/commons/collapse';

const cx = bindClassNames(styles);

const SidebarComponent: React.FC = memo(() => {
  return (
    <div className={cx('sidebar-wrapper')}>
      <CollapsibleBlock></CollapsibleBlock>
    </div>
  );
});

export default SidebarComponent;
