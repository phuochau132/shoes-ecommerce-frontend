// AnnouncementBar.tsx
import React, { memo } from 'react';
import styles from './login.module.scss';
import { ButtonComponent, InputComponent } from '../../../../commons';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarLayout from '../layout';
import { setLoginSidebarState } from '@/redux/app/app.slice';
import { useDispatch } from 'react-redux';

const cx = bindClassNames(styles);

const LoginSidebar: React.FC = memo(() => {
  const dispatch = useDispatch();

  return (
    <SidebarLayout
      callback={() => {
        dispatch(setLoginSidebarState(false));
      }}
      title="Login"
    >
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
    </SidebarLayout>
  );
});

export default LoginSidebar;
