import React, { useEffect, useRef } from 'react';

interface CollapseProps {
  children: React.ReactNode;
}

function CollapsibleBlock({ children }: CollapseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const heading = containerRef.current.querySelector('.collapsible-heading');
      const content = containerRef.current.querySelector('.collapsible-content');
      console.log('heading:', heading);
      console.log('content:', content);
    }
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export default CollapsibleBlock;
