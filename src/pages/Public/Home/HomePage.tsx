import styles from './home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const HomePage = () => {
  return <div className={cx('container')}></div>;
};

export default HomePage;
