import React, { memo } from 'react';
import styles from './footer.module.scss';
import { FbIcon, InstagramIcon, Message2Icon, MessageIcon, PinterestIcon, TwitterIcon } from '@/utils/icons';
import { bindClassNames } from '@/utils/helpers/cx';
import { paths } from '@/routes/paths';

const cx = bindClassNames(styles);

const FooterComponent: React.FC = memo(() => {
  return (
    <footer className={cx('footer')}>
      <div className={cx('container')}>
        <div className={cx('footer-content-top')}>
          <div className={cx('container')}>
            <div className={cx('footer-block-item', 'footer-text')}>
              <p className={cx('text')}>150 Phan Van Tri, Go Vap District</p>
              <p className={cx('text')}>Ho Chi Minh City</p>
              <p className={cx('text')} style={{ marginBottom: '20px' }}>
                Vietnam
              </p>
              <div className="mb-[5px] flex gap-[5px]">
                <span className="icon">
                  <Message2Icon className="h-[20px] w-[20px]" />
                </span>
                <div>
                  <p className={cx('text')}>
                    Text: <a href="tel:+84979574301">+84 (979) 574-301</a>
                  </p>
                </div>
              </div>
              <div className="flex gap-[5px]">
                <span className="icon">
                  <MessageIcon className="h-[20px] w-[20px]" />
                </span>
                <div>
                  <p className={cx('text')}>
                    <a href="mailto:nguyenhauxmvt@gmail.com">nguyenhauxmvt@gmail.com</a>
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
                    <a href={paths.collection.newIn} className="link">
                      <span className={cx('text')}>New in</span>
                    </a>
                  </li>
                  <li>
                    <a href={paths.collection.bestSeller} className="link">
                      <span className={cx('text')}>Best Sellers</span>
                    </a>
                  </li>
                  <li>
                    <a href={paths.collection.man} className="link">
                      <span className={cx('text')}>Man</span>
                    </a>
                  </li>
                  <li>
                    <a href={paths.collection.woman} className="link">
                      <span className={cx('text')}>Woman</span>
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
                    <a href={paths.contact} className="link">
                      <span className={cx('text')}>Contact us</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={cx('footer-block-item', 'footer-social')}>
              <div className={cx('footer__social-header')}>
                <h2 className={cx('title')}>Follow Us</h2>
              </div>
              <div className={cx('footer__social-list', 'mt-[10px]')}>
                <ul className={cx('list-unstyled')}>
                  <li className={cx('social-item')}>
                    <a href="https://www.facebook.com/hau.phuoc.1293575/" className={cx('link')}>
                      <FbIcon className={cx('icon', 'h-[20px] w-[20px]')} />
                    </a>
                  </li>
                  <li className={cx('social-item')}>
                    <a href="https://www.instagram.com/ph_hau56/" className={cx('link')}>
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
