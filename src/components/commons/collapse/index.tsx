import React, { useRef } from 'react';
import './collapse.scss';

interface CollapseProps {
  children: React.ReactNode;
  title: string;
}

function CollapsibleBlock({ children, title }: CollapseProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isExpandedRef = useRef(false);

  const handleToggle = () => {
    const content = contentRef.current;

    if (content) {
      if (isExpandedRef.current) {
        content.style.maxHeight = '';
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }

      isExpandedRef.current = !isExpandedRef.current;
    }
  };

  return (
    <div className="collapsible-wrapper">
      <h3 className="collapsible-heading mb-[2rem] mt-[3px] cursor-pointer" onClick={handleToggle}>
        <span>{title}</span>
        <span className="icon_plus"></span>
      </h3>
      <div className="collapsible-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

export default CollapsibleBlock;
