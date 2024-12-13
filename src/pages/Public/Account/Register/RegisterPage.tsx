import { useEffect } from 'react';
import styles from './register.module.scss';
import { bindClassNames } from '@/utils/helpers/cx';
import { useDispatch } from 'react-redux';
import { setPageInfo } from '@/redux/app/app.slice';

const cx = bindClassNames(styles);

const RegisterPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setPageInfo({
        breadcrumb: [
          { path: '/', title: 'Home' },
          { path: '#', title: 'Account' }
        ],
        title: 'Account'
      })
    );
  }, []);
  return <div className={cx('mx-[auto]', 'register-page')}></div>;
};

export default RegisterPage;
