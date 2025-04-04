import React, { memo, useState } from 'react';
import styles from './mobileNavigation.module.scss';
import { Navigation } from '../index';
import { CloseIcon, MinusIcon, PlusIcon } from '@/utils/icons';
import { useDispatch } from 'react-redux';
import { setMenuSidebarState } from '@/redux/slice/app/app.slice';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const MobileNavigation: React.FC<{ menu: Navigation[] }> = memo(({ menu }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const toggleMenu = (menuName: string, type: string) => {
    if (type == 'lv1') {
      setOpenMenus((prev) => ({
        [menuName]: !prev[menuName]
      }));
    } else {
      setOpenMenus((prev) => ({
        ...prev,
        [menuName]: !prev[menuName]
      }));
    }
  };

  return (
    <div className={cx('mobile-menu', 'sidebar', 'z-[4] flex flex-col items-center px-[20px] pb-[30px] pt-[20px]')}>
      <div className={cx('sidebar__menu-header flex w-full items-center justify-between')}>
        <div className={cx('sidebar__menu-header', 'flex')}>
          <div className={cx('heading')}>Menu</div>
        </div>
        <div className={cx('close-btn', 'cursor-pointer')} onClick={() => dispatch(setMenuSidebarState(false))}>
          <CloseIcon className={cx('rotate')} />
        </div>
      </div>

      <ul className={cx('list-menu', 'wrap mt-[20px] w-full flex-1 flex-wrap gap-[10px]')}>
        {menu.map((item) => (
          <li className={cx('menu__item', 'menu-lv1')} key={item.name}>
            <div className={cx('menu__item-link', 'flex items-center justify-between')}>
              <a className={cx('link', 'flex-1')} href={item.link}>
                <span className={cx('text', 'text-[16px] font-bold')}>{item.name}</span>
              </a>
              {item.children && (
                <div className={cx('cursor-pointer p-[10px]')} onClick={() => toggleMenu(item.name, 'lv1')}>
                  {openMenus[item.name] ? <MinusIcon /> : <PlusIcon />}
                </div>
              )}
            </div>
            {item.children && (
              <div
                className={cx('menu-dropdown', 'ml-[10px] duration-300', {
                  'invisible max-h-[0] opacity-0': !openMenus[item.name]
                })}
              >
                {item.children.map((menu_lv2, index_lv2) => (
                  <li className={cx('menu__item', 'menu-lv2')} key={`${menu_lv2.name}-${index_lv2}`}>
                    <div className={cx('menu__item-link', 'flex items-center justify-between')}>
                      <a className={cx('link', 'flex-1')} href={menu_lv2.link}>
                        <span className={cx('text', 'text-[13px] font-[600]')}>{menu_lv2.name}</span>
                      </a>
                      {item.children && (
                        <div
                          className={cx('cursor-pointer p-[10px]')}
                          onClick={() => toggleMenu(menu_lv2.name, 'submenu')}
                        >
                          {openMenus[menu_lv2.name] ? <MinusIcon /> : <PlusIcon />}
                        </div>
                      )}
                    </div>
                    {menu_lv2.children && (
                      <div
                        className={cx('menu-dropdown', 'ml-[10px] duration-300', {
                          'invisible max-h-[0] opacity-0': !openMenus[menu_lv2.name]
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
      <div className="sub-logo max-w-[100px] cursor-pointer">
        <a className="link" href="/">
          <img
            className="w-full"
            src="https://res.cloudinary.com/dvgjegefi/image/upload/v1739107238/effiel_new-ezgif.com-resize_areov3.png"
            alt="logo"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
});

export default MobileNavigation;
