import React, { useEffect, useRef } from 'react';

interface CollapseProps {
  children: React.ReactNode;
}

function CollapsibleBlock({ children }: CollapseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const someElement = containerRef.current.querySelector('.collapsible-heading');

      console.log('Found element:', someElement);
    }
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export default CollapsibleBlock;
