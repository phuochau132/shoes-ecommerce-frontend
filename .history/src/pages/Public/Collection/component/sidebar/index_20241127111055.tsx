import React, { memo } from 'react';
import styles from './sidebar.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import CollapsibleBlock from '@/components/commons/collapse';

const cx = bindClassNames(styles);

const SidebarComponent: React.FC = memo(() => {
  return (
    <div className={cx('sidebar-wrapper')}>
      <CollapsibleBlock>
        hautest111111111111 1111111111111111 hautest11111 1 111111 1111111111111111 hautest111111 1111111111111111111111
      </CollapsibleBlock>
    </div>
  );
});

export default SidebarComponent;
