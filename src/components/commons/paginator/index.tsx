import React, { useRef } from 'react';
import './collapse.scss';
import classNames from 'classnames';

interface CollapseProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  classNameForHeading?: string;
}

function CollapsibleBlock({ children, title, className, classNameForHeading }: CollapseProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isExpandedRef = useRef(false);

  const handleToggle = () => {
    const content = contentRef.current;

    if (content && headingRef.current) {
      if (isExpandedRef.current) {
        content.style.maxHeight = '';
        headingRef.current.classList.remove('is-activated');
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
        headingRef.current.classList.add('is-activated');
      }
      isExpandedRef.current = !isExpandedRef.current;
    }
  };

  return (
    <div className={`collapsible-wrapper ${className}`}>
      <h3
        ref={headingRef}
        className={`collapsible-heading mb-[2rem] mt-[3px] cursor-pointer ${classNameForHeading && classNameForHeading}`}
        onClick={handleToggle}
      >
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
