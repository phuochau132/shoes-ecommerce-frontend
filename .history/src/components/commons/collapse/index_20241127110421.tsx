import React, { useEffect, useRef } from 'react';

interface CollapseProps {
  children: React.ReactNode;
}

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

        // Cleanup event listener on unmount
        return () => {
          heading.removeEventListener('click', handleClick);
        };
      }
    }
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export default CollapsibleBlock;
