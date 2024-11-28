import React, { useEffect, useRef } from 'react';
import './collapse.scss';

interface CollapseProps {
  children: React.ReactNode;
  title: string;
}

function CollapsibleBlock({ children, title }: CollapseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const heading = container.querySelector<HTMLDivElement>('.collapsible-heading');
      const content = container.querySelector<HTMLDivElement>('.collapsible-content');

      if (heading && content) {
        const handleClick = () => {
          heading.classList.toggle('is-activated');
          if (content.style.maxHeight) {
            content.style.maxHeight = '';
          } else {
            console.log('content.scrollHeight', content.scrollHeight);

            content.style.maxHeight = content.scrollHeight + 'px';
          }
        };

        heading.addEventListener('click', handleClick);

        return () => {
          heading.removeEventListener('click', handleClick);
        };
      }
    }
  }, []);

  return (
    <div className="collapsible-wrapper pb-[5px]" ref={containerRef}>
      <h3 className="collapsible-heading cursor-pointer pb-[1rem] pt-[3px]">
        <span>{title}</span>
        <span className="icon_plus"></span>
      </h3>
      <div className="collapsible-content">{children}</div>
    </div>
  );
}

export default CollapsibleBlock;
