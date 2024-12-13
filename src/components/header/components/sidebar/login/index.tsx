// AnnouncementBar.tsx
import React, { memo, useState } from 'react';
import styles from './login.module.scss';
import { ButtonComponent, InputComponent } from '../../../../commons';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarLayout from '../layout';
import { setLoginSidebarState } from '@/redux/app/app.slice';
import { useDispatch } from 'react-redux';
import { AccountSidebarEnum } from '@/types/enum/accountSidebar';
import { HideIcon, ViewIcon } from '@/utils/icons';
import { InputEnum } from '@/types/enum/input';

const cx = bindClassNames(styles);

const LoginSidebar: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState(InputEnum.password);

  const [contentSidebar, setSidebarContent] = useState(AccountSidebarEnum.login);
  return (
    <SidebarLayout
      callback={() => {
        dispatch(setLoginSidebarState(false));
      }}
      title={contentSidebar}
    >
      {contentSidebar == AccountSidebarEnum.login && (
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
            <div className="relative">
              <InputComponent
                type={inputType}
                id="customer-password"
                className={cx('field')}
                placeholder="Password"
              ></InputComponent>
              <div className="show-passWord absolute right-0 top-[50%] -translate-y-1/2">
                {inputType == InputEnum.password ? (
                  <div
                    onClick={() => {
                      setInputType(InputEnum.text);
                    }}
                    className="icon-wrapper cursor-pointer p-[20px]"
                  >
                    <HideIcon />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setInputType(InputEnum.password);
                    }}
                    className="icon-wrapper cursor-pointer p-[20px]"
                  >
                    <ViewIcon />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setSidebarContent(AccountSidebarEnum.recover);
            }}
            className="link mt-[12px] block cursor-pointer text-center"
          >
            <span className="text">Forgot your password?</span>
          </div>
          <ButtonComponent animation={true}>Log In</ButtonComponent>
          <ButtonComponent
            onClick={() => {
              setSidebarContent(AccountSidebarEnum.register);
            }}
            animation={true}
            style={{ backgroundColor: 'white', color: 'black' }}
          >
            Create Account
          </ButtonComponent>
        </div>
      )}
      {contentSidebar == AccountSidebarEnum.register && (
        <div className={cx('register__sidebar-form')}>
          <div className={cx('form-fields')}>
            <label className="mb-[8px]" htmlFor="customer-email">
              Your Name <small>*</small>
            </label>
            <InputComponent id="customer-email" className={cx('field')} placeholder="Your Name" />
          </div>
          <div className={cx('form-fields')}>
            <label className="mb-[8px]" htmlFor="customer-email">
              Your Email <small>*</small>
            </label>
            <InputComponent id="customer-email" className={cx('field')} placeholder="Your Email" />
          </div>
          <div className={cx('form-fields', 'mt-[20px]')}>
            <label className="mb-[8px]" htmlFor="customer-password">
              Password <small>*</small>
            </label>
            <div className="relative">
              <InputComponent type={inputType} id="customer-password" className={cx('field')} placeholder="Password" />
              <div className="show-passWord absolute right-0 top-[50%] -translate-y-1/2">
                {inputType == InputEnum.password ? (
                  <div
                    onClick={() => {
                      setInputType(InputEnum.text);
                    }}
                    className="icon-wrapper cursor-pointer p-[20px]"
                  >
                    <HideIcon />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setInputType(InputEnum.password);
                    }}
                    className="icon-wrapper cursor-pointer p-[20px]"
                  >
                    <ViewIcon />
                  </div>
                )}
              </div>
            </div>
          </div>
          <ButtonComponent animation={true} style={{ backgroundColor: 'white', color: 'black' }}>
            Create Account
          </ButtonComponent>
          <ButtonComponent
            onClick={() => {
              setSidebarContent(AccountSidebarEnum.login);
            }}
            animation={true}
          >
            Log In
          </ButtonComponent>
        </div>
      )}
      {contentSidebar == AccountSidebarEnum.recover && (
        <div className={cx('recover__sidebar-form')}>
          <div className={cx('form-fields')}>
            <label className="mb-[8px]" htmlFor="customer-email">
              Your Email <small>*</small>
            </label>
            <InputComponent id="customer-email" className={cx('field')} placeholder="Your Email" />
          </div>

          <ButtonComponent animation={true} style={{ backgroundColor: 'white', color: 'black' }}>
            Reset Password
          </ButtonComponent>
          <ButtonComponent
            onClick={() => {
              setSidebarContent(AccountSidebarEnum.login);
            }}
            animation={true}
          >
            Log In
          </ButtonComponent>
        </div>
      )}
    </SidebarLayout>
  );
});

export default LoginSidebar;
