import { useEffect } from 'react';

export type CollapseProps = {
  className: string;
  children: React.ReactNode;
};

function CollapsibleBlock({ className, children }: CollapseProps) {
  useEffect(() => {
    const coll = document.getElementsByClassName(className);

    Array.from(coll).forEach((element) => {
      element.addEventListener('click', function (event) {
        const target = event.currentTarget as HTMLElement;
        target.classList.toggle('is-activated');
        const content = target.nextElementSibling as HTMLElement;

        if (content.style.maxHeight) {
          content.style.maxHeight = '';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });

    return () => {
      Array.from(coll).forEach((element) => {
        element.removeEventListener('click', () => {});
      });
    };
  }, [className]);

  return <>{children}</>;
}

export default CollapsibleBlock;
