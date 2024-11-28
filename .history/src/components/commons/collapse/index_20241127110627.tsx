import React, { useEffect, useRef } from 'react';
import styles from './collapse.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';

interface CollapseProps {
  children: React.ReactNode;
}
const cx = bindClassNames(styles);

function CollapsibleBlock({ children }: CollapseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const heading = container.querySelector<HTMLDivElement>('.collapsible-heading');
      const content = container.querySelector<HTMLDivElement>('.collapsible-content');

      if (heading && content) {
        const handleClick = () => {
          heading.classList.toggle('is-activated');
          if (content.style.display === 'block') {
            content.style.display = 'none';
          } else {
            content.style.display = 'block';
          }
        };

        heading.addEventListener('click', handleClick);

        return () => {
          heading.removeEventListener('click', handleClick);
        };
      }
    }
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export default CollapsibleBlock;
