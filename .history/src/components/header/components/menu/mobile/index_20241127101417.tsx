import React, { memo, useState } from 'react';
import styles from './mobileNavigation.module.scss';
import { Navigation } from '../index';
import { CloseIcon, MinusIcon, PlusIcon } from '@/utils/icons';
import { useDispatch } from 'react-redux';
import { setMenuSidebarState } from '@/redux/app/app.slice';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const MobileNavigation: React.FC<{ menu: Navigation[] }> = memo(({ menu }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const toggleMenuLevel1 = (menuName: string) => {
    setOpenMenus((prev) => ({
      [menuName]: !prev[menuName]
    }));
  };

  const toggleSubMenu = (menuName: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  return (
    <div className={cx('mobile-menu', 'sidebar', 'flex flex-col items-center pl-[30px] pt-[30px]')}>
      <div className={cx('sidebar__menu-header flex w-full justify-between')}>
        <div className={cx('close-btn', 'cursor-pointer')} onClick={() => dispatch(setMenuSidebarState(false))}>
          <CloseIcon className={cx('rotate')} />
        </div>
        <div className={cx('sidebar__menu-logo', 'flex items-center')}>
          <a href="#" className={cx('logo-link')}>
            <img
              src="https://www.khy.com/cdn/shop/files/KHY-Logo-Dark.png?v=1720636390&width=500"
              alt="new-ella-demo"
              width="70"
              height="28"
              className={cx('header__heading-logo')}
            />
          </a>
        </div>
        <div className={cx('w-[60px]')}></div>
      </div>

      <ul className={cx('list-menu', 'wrap mt-[50px] w-full flex-1 flex-wrap gap-[10px] overflow-y-scroll')}>
        {menu.map((item) => (
          <li className={cx('menu__item', 'menu-lv1', 'pr-[30px]')} key={item.name}>
            <div className={cx('menu__item-link', 'flex items-center justify-between')}>
              <a className={cx('link')} href={item.link}>
                <span className={cx('text', 'text-[16px] font-bold')}>{item.name}</span>
              </a>
              <div className={cx('cursor-pointer', 'p-[10px]')} onClick={() => toggleMenuLevel1(item.name)}>
                {openMenus[item.name] ? <MinusIcon /> : <PlusIcon />}
              </div>
            </div>
            {item.children && (
              <div
                className={cx('menu-dropdown', {
                  'invisible h-[0] opacity-0': !openMenus[item.name]
                })}
              >
                {item.children.map((menu_lv2, index_lv2) => (
                  <li className={cx('menu__item', 'menu-lv2')} key={`${menu_lv2.name}-${index_lv2}`}>
                    <div className={cx('menu__item-link', 'flex items-center justify-between')}>
                      <a className={cx('link', 'flex-1')} href={menu_lv2.link}>
                        <span className={cx('text', 'text-[14px]')}>{menu_lv2.name}</span>
                      </a>
                      <div className={cx('cursor-pointer', 'p-[10px]')} onClick={() => toggleSubMenu(menu_lv2.name)}>
                        {openMenus[menu_lv2.name] ? <MinusIcon /> : <PlusIcon />}
                      </div>
                    </div>
                    {menu_lv2.children && (
                      <div
                        className={cx('menu-dropdown', {
                          'invisible h-[0] opacity-0': !openMenus[menu_lv2.name]
                        })}
                      >
                        {menu_lv2.children.map((menu_lv3, index_lv3) => (
                          <li className={cx('menu__item', 'menu-lv3')} key={`${menu_lv3.name}-${index_lv3}`}>
                            <div className={cx('menu__item-link', 'flex items-center justify-between')}>
                              <a className={cx('link', 'flex-1')} href={menu_lv2.link}>
                                <span className={cx('text', 'text-[12px]')}>{menu_lv2.name}</span>
                              </a>
                            </div>
                          </li>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default MobileNavigation;
