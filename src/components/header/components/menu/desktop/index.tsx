// AnnouncementBar.tsx
import React, { memo } from 'react';
import styles from './desktopNavigation.module.scss';
import { Navigation } from '../index';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const DesktopNavigation: React.FC<{ menu: Navigation[] }> = memo(({ menu }) => {
  return (
    <div className={cx('main-menu header-item flex items-center gap-[50px]')}>
      <ul className={cx('list-menu', 'flex', 'gap-[50px]')}>
        {menu.map((item, index) => {
          if (item.style === 'dropdown') {
            return (
              <li key={index} className={cx('menu-item', 'menu-lv1', 'text-[14px]')}>
                <a className={cx('menu__item-link')} href={item.link}>
                  <span className={cx('text', 'font-bold')}>{item.name}</span>
                </a>
                {item.children && item.children?.length > 0 && (
                  <div className={cx('menu-dropdown')}>
                    {item.children?.map((menu_lv2, index_lv2) => {
                      return (
                        <li className={cx('menu-item', 'menu-lv2')} key={`${menu_lv2.name}-${index_lv2}`}>
                          <a className={cx('menu__item-link')} href={menu_lv2.link}>
                            <span className={cx('text', 'text-[12px]')}>{menu_lv2.name}</span>
                          </a>
                          <div className={cx('menu-dropdown', 'left-full', 'top-[0]')}>
                            {menu_lv2.children?.map((menu_lv3, index_lv3) => {
                              return (
                                <li className={cx('menu-item', 'menu-lv3')} key={`${menu_lv3.name}-${index_lv3}`}>
                                  <a className={cx('menu__item-link')} href={menu_lv3.link}>
                                    <span className={cx('text', 'text-[12px]')}>{menu_lv3.name}</span>
                                  </a>
                                </li>
                              );
                            })}
                          </div>
                        </li>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
});

export default DesktopNavigation;
