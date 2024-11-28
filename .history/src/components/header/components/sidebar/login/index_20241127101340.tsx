// AnnouncementBar.tsx
import React, { memo } from 'react';
import styles from './login.module.scss';
import { CloseIcon } from '@/utils/icons';
import { ButtonComponent, InputComponent } from '../../../../commons';
import { useDispatch } from 'react-redux';
import { setLoginSidebarState } from '@/redux/app/app.slice';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const LoginSidebar: React.FC = memo(() => {
  const dispatch = useDispatch();
  return (
    <div
      className={cx(
        'login-sidebar',
        'fixed bottom-0 right-0 top-0 z-[2] w-full max-w-[340px] bg-[white] px-[24px] py-[25px]'
      )}
    >
      <div
        className={cx(
          'login__sidebar-header',
          'h-[auto]',
          'text-right',
          'flex',
          'justify-between',
          'items-center',
          'mb-[10px]'
        )}
      >
        <span className={cx('login__sidebar-header-title', 'text-[18px]', 'italic', 'font-bold')}>Login</span>
        <div
          onClick={() => {
            dispatch(setLoginSidebarState(false));
          }}
          className={cx('login__sidebar-close-wrapper rotate', 'py-[10px]', 'cursor-pointer')}
        >
          <CloseIcon style={{ float: 'right' }} />
        </div>
      </div>
      <div className={cx('login__sidebar-form')}>
        <div className={cx('form-fields')}>
          <label className="mb-[8px]" htmlFor="customer-email">
            Email Address <small>*</small>
          </label>
          <InputComponent id="customer-email" className={cx('field')} placeholder="Email Address" />
        </div>
        <div className={cx('form-fields', 'mt-[20px]')}>
          <label className="mb-[8px]" htmlFor="customer-password">
            Password <small>*</small>
          </label>
          <InputComponent id="customer-password" className={cx('field')} placeholder="Password" />
        </div>
        <ButtonComponent animation={true}>Log In</ButtonComponent>
        <a className="link link-underline mt-[12px] block text-center" href="#">
          <span className="text">Forgot your password?</span>
        </a>
        <ButtonComponent animation={true} style={{ backgroundColor: 'white', color: 'black' }}>
          Crate Account
        </ButtonComponent>
      </div>
    </div>
  );
});

export default LoginSidebar;
