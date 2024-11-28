import React, { memo } from 'react';
import styles from './footer.module.scss';
import { FbIcon, InstagramIcon, Message2Icon, MessageIcon, PinterestIcon, TwitterIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';

const cx = bindClassNames(styles);

const FooterComponent: React.FC = memo(() => {
  return (
    <footer className={cx('footer')}>
      <div className={cx('container')}>
        <div className={cx('footer-content-top')}>
          <div className={cx('container')}>
            <div className={cx('footer-block-item', 'footer-text')}>
              <p>685 Market Street</p>
              <p>San Francisco, CA 94105,</p>
              <p style={{ marginBottom: '20px' }}>United States</p>
              <div className="mb-[5px] flex gap-[5px]">
                <span className="icon">
                  <Message2Icon className="h-[20px] w-[20px]" />
                </span>
                <div>
                  <p>
                    Text: <a href="tel:%20%20091-123-ELLA">(091)-123-ELLA</a>
                  </p>
                </div>
              </div>
              <div className="flex gap-[5px]">
                <span className="icon">
                  <MessageIcon className="h-[20px] w-[20px]" />
                </span>
                <div>
                  <p>
                    <a href="mailto:email@domain.com">email@domain.com</a>
                  </p>
                </div>
              </div>
            </div>
            <div className={cx('footer-block-item', 'footer-link')}>
              <div className={cx('footer__link-header')}>
                <h2 className={cx('title')}>Shop By</h2>
              </div>
              <div className={cx('footer__link-list')}>
                <ul className={cx('list-unstyled')}>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('footer-block-item', 'footer-link')}>
              <div className={cx('footer__link-header')}>
                <h2 className={cx('title')}>Information</h2>
              </div>
              <div className={cx('footer__link-list')}>
                <ul className={cx('list-unstyled')}>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('footer-block-item', 'footer-link')}>
              <div className={cx('footer__link-header')}>
                <h2 className={cx('title')}>Customer Service</h2>
              </div>
              <div className={cx('footer__link-list')}>
                <ul className={cx('list-unstyled')}>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('footer-block-item', 'footer-social')}>
              <div className={cx('footer__social-header')}>
                <h2 className={cx('title')}>Follow Us</h2>
              </div>
              <div className={cx('footer__social-list')}>
                <ul className={cx('list-unstyled')}>
                  <li className={cx('social-item')}>
                    <a href="#" className={cx('link')}>
                      <FbIcon className={cx('icon', 'h-[20px] w-[20px]')} />
                    </a>
                  </li>
                  <li className={cx('social-item')}>
                    <a href="#" className={cx('link')}>
                      <InstagramIcon className={cx('icon', 'h-[20px] w-[20px]')} />
                    </a>
                  </li>
                  <li className={cx('social-item')}>
                    <a href="#" className={cx('link')}>
                      <PinterestIcon className={cx('icon', 'h-[20px] w-[20px]')} />
                    </a>
                  </li>
                  <li className={cx('social-item')}>
                    <a href="#" className={cx('link')}>
                      <TwitterIcon className={cx('icon', 'h-[20px] w-[20px]')} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default FooterComponent;
