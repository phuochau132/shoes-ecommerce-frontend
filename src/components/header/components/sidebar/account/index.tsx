// AnnouncementBar.tsx
import React, { memo, useCallback, useState } from 'react';
import styles from './accountSidebar.module.scss';
import { ButtonComponent, InputComponent } from '../../../../commons';
import { bindClassNames } from '@/utils/helpers/cx';
import SidebarLayout from '../layout';
import { setAccountSidebarState } from '@/redux/slice/app/app.slice';
import { useDispatch } from 'react-redux';
import { AccountSidebarEnum } from '@/types/enum/accountSidebar';
import { CheckedIcon, HideIcon, ViewIcon } from '@/utils/icons';
import { InputEnum } from '@/types/enum/input';
import { useForgotPasswordMutation, useLoginMutation, useRegisterMutation } from '@/apis/auth/auth.api';

import { authSchema } from '@/validations/auth.validation';
import { useValidation, useForm } from '@/utils/hooks/form';
import { setUser } from '@/redux/slice/user/user.slice';
import Cookies from 'js-cookie';
import { useGetInfoMutation } from '@/apis/user/user.api';

const cx = bindClassNames(styles);

const initialRegisterData = {
  email: '',
  password: '',
  telephone: '',
  address: '',
  full_name: ''
};
const initialLoginData = {
  email: '',
  password: ''
};
const initialForgotPasswordData = {
  email: ''
};
const AccountSidebar: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState(InputEnum.password);
  const [contentSidebar, setSidebarContent] = useState(AccountSidebarEnum.login);
  const [register, { isLoading: isRegisterLoading, isSuccess: isRegisterSuccess }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isForgotPasswordLoading, isSuccess: isForgotPasswordSuccess }] =
    useForgotPasswordMutation();
  const { errors: loginErrors, validate: validateLoginForm } = useValidation(authSchema);
  const { errors: registerErrors, validate: validateRegisterForm } = useValidation(authSchema);
  const { errors: forgotPasswordErrors, validate: validateForgotPasswordForm } = useValidation(authSchema);
  const [getInfo] = useGetInfoMutation();
  const {
    formData: registerFormData,
    handleChange: handleRegisterChange,
    setFormData: setRegisterFormData
  } = useForm(initialRegisterData);
  const {
    formData: loginFormData,
    handleChange: handleLoginChange,
    setFormData: setLoginFormData
  } = useForm(initialLoginData);
  const {
    formData: forgotPasswordFormData,
    handleChange: handleForgotPasswordChange,
    setFormData: setForgotPasswordFormData
  } = useForm(initialForgotPasswordData);

  const handleRegister = useCallback(
    async (values: Record<string, string>) => {
      const errors: any = await validateRegisterForm(values);
      if (Object.keys(errors).length === 0) {
        try {
          const res = await register(registerFormData).unwrap();
          if (!res.error) {
            setRegisterFormData(initialRegisterData);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    [registerFormData]
  );

  const handleLogin = useCallback(
    async (values: Record<string, string>) => {
      const errors: any = await validateLoginForm(values);
      if (Object.keys(errors).length === 0) {
        try {
          const loginResponse = await login(loginFormData).unwrap();
          if (!loginResponse.error) {
            setLoginFormData(initialLoginData);
            dispatch(setAccountSidebarState(false));
            Cookies.set('access_token', loginResponse.data.token);
            const userInfoResponse = await getInfo().unwrap();
            dispatch(setUser(userInfoResponse.data));
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    [loginFormData]
  );
  const handleForgotPassword = useCallback(
    async (values: Record<string, string>) => {
      const errors: any = await validateForgotPasswordForm(values);
      if (Object.keys(errors).length === 0) {
        try {
          const res = await forgotPassword({ email: forgotPasswordFormData.email }).unwrap();
          if (!res.error) {
            setForgotPasswordFormData(initialForgotPasswordData);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    [forgotPasswordFormData]
  );

  return (
    <SidebarLayout
      callback={() => {
        dispatch(setAccountSidebarState(false));
      }}
      title={contentSidebar}
    >
      {contentSidebar == AccountSidebarEnum.login && (
        <div className={cx('login__sidebar-form')}>
          <div className={cx('form-fields')}>
            <div className="mb-[8px] flex justify-between">
              <label className="flex-1" htmlFor="customer-email">
                Your Email <small>*</small>
              </label>
              {loginErrors.email && <span className="error">{loginErrors.email}</span>}
            </div>
            <InputComponent
              onChange={handleLoginChange}
              value={loginFormData.email}
              id="customer-email"
              name="email"
              className={cx('field')}
              placeholder="Email Address"
            />
          </div>
          <div className={cx('form-fields', 'mt-[20px]')}>
            <div className="mb-[8px] flex justify-between">
              <label className="flex-1" htmlFor="customer-password">
                Your Password <small>*</small>
              </label>
              {loginErrors.password && <span className="error">{loginErrors.password}</span>}
            </div>
            <div className="relative">
              <InputComponent
                value={loginFormData.password}
                onChange={handleLoginChange}
                type={inputType}
                id="customer-password"
                className={cx('field')}
                placeholder="Password"
                name="password"
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
          <ButtonComponent
            isLoading={isLoginLoading}
            onClick={() => {
              handleLogin(loginFormData);
            }}
            animation={true}
          >
            Log In
          </ButtonComponent>
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
        <div className="flex h-full flex-col">
          <div className={cx('register__sidebar-form', 'flex-1 overflow-y-scroll')}>
            <div className={cx('form-fields')}>
              <div className="mb-[8px] flex justify-between">
                <label className="flex-1" htmlFor="customer-email">
                  Your Email <small>*</small>
                </label>
                {registerErrors.email && <span className="error">{registerErrors.email}</span>}
              </div>
              <InputComponent
                value={registerFormData.email}
                onChange={handleRegisterChange}
                id="customer-email"
                name="email"
                className={cx('field')}
                placeholder="Your Name"
              />
            </div>
            <div className={cx('form-fields', 'mt-[20px]')}>
              <div className="mb-[8px] flex justify-between">
                <label className="flex-1" htmlFor="customer-password">
                  Password <small>*</small>
                </label>
                {registerErrors.password && <span className="error">{registerErrors.password}</span>}
              </div>
              <div className="relative">
                <InputComponent
                  value={registerFormData.password}
                  id="customer-password"
                  onChange={handleRegisterChange}
                  name="password"
                  type={inputType}
                  className={cx('field')}
                  placeholder="Password"
                />
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
            <div className={cx('form-fields')}>
              <div className="mb-[8px] flex justify-between">
                <label className="flex-1" htmlFor="customer-telephone">
                  Your phone <small>*</small>
                </label>
                {registerErrors.telephone && <span className="error">{registerErrors.telephone}</span>}
              </div>
              <InputComponent
                value={registerFormData.telephone}
                onChange={handleRegisterChange}
                id="customer-telephone"
                name="telephone"
                className={cx('field')}
                placeholder="Your Phone"
              />
            </div>
            <div className={cx('form-fields')}>
              <div className="mb-[8px] flex justify-between">
                <label className="flex-1" htmlFor="customer-address">
                  Full Name <small>*</small>
                </label>
                {registerErrors.full_name && <span className="error">{registerErrors.full_name}</span>}
              </div>
              <InputComponent
                value={registerFormData.full_name}
                onChange={handleRegisterChange}
                id="customer-address"
                name="full_name"
                className={cx('field')}
                placeholder="Full Name"
              />
            </div>
            <div className={cx('form-fields')}>
              <div className="mb-[8px] flex justify-between">
                <label className="flex-1" htmlFor="customer-address">
                  Your address <small>*</small>
                </label>
                {registerErrors.address && <span className="error">{registerErrors.address}</span>}
              </div>
              <InputComponent
                value={registerFormData.address}
                onChange={handleRegisterChange}
                id="customer-address"
                name="address"
                className={cx('field')}
                placeholder="Your Address"
              />
            </div>
          </div>
          <div className="form-actions h-[200px]">
            {isRegisterSuccess && (
              <div className="mt-[20px] flex items-center gap-[5px] text-[green]">
                <CheckedIcon /> <span>Please check your email to verify your account.</span>{' '}
              </div>
            )}
            <ButtonComponent
              isLoading={isRegisterLoading}
              onClick={() => {
                handleRegister(registerFormData);
              }}
              animation={true}
              style={{ backgroundColor: 'white', color: 'black' }}
            >
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
        </div>
      )}
      {contentSidebar == AccountSidebarEnum.recover && (
        <div className={cx('recover__sidebar-form')}>
          <div className={cx('form-fields')}>
            <div className="mb-[8px] flex justify-between">
              <label className="flex-1" htmlFor="customer-email">
                Your Email <small>*</small>
              </label>
              {forgotPasswordErrors.email && <span className="error">{forgotPasswordErrors.email}</span>}
            </div>
            <InputComponent
              onChange={handleForgotPasswordChange}
              value={forgotPasswordFormData.email}
              type="email"
              id="customer-email"
              name="email"
              className={cx('field')}
              placeholder="Email Address"
            />
          </div>
          {isForgotPasswordSuccess && (
            <div className="mt-[20px] flex items-center gap-[5px] text-[green]">
              <CheckedIcon /> <span>Please check your email to change password.</span>
            </div>
          )}
          <ButtonComponent
            onClick={() => {
              handleForgotPassword(forgotPasswordFormData);
            }}
            isLoading={isForgotPasswordLoading}
            animation={true}
            style={{ backgroundColor: 'white', color: 'black' }}
          >
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

export default AccountSidebar;
