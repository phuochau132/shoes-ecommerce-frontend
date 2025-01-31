import { ImageComponent } from '@/components/commons';
import styles from './home.module.scss';
import ProductBlockComponent from '@/components/products/productBlock';
import { bindClassNames } from '@/utils/helpers/cx';
import { useEffect } from 'react';
import { Currency } from '@/utils/helpers/CurrenciesFormat';

const cx = bindClassNames(styles);

const HomePage = () => {
  useEffect(() => {
    Currency.initializeCurrency();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('slide-show')}>
        <ImageComponent src="//new-ella-demo.myshopify.com/cdn/shop/files/home-shoes-slider-01.jpg?v=1655787469" />
      </div>
      <section className={cx('section-image-banner', 'flex gap-[27px]')}>
        <div className={cx('image__banner-item', 'larger-banner', 'w-[50%]')}>
          <div className={cx('image-box')}>
            <ImageComponent
              aspect_ratio="82.75862068965517%"
              src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-image-1_870x.jpg"
            />
          </div>
        </div>
        <div className={cx('image__banner-item', 'small-banner', 'flex w-[50%] flex-col justify-between')}>
          <div className={cx('row')}>
            <div className={cx('image-box', 'w-full')}>
              <ImageComponent src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-image-2_870x.jpg" />
            </div>
          </div>

          <div className={cx('row flex gap-[20px] pt-[10px]')}>
            <div className={cx('w-[50%]')}>
              <div className={cx('image-box')}>
                <ImageComponent
                  aspect_ratio="82%"
                  src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-image-3_420x.jpg"
                />
              </div>
            </div>
            <div className={cx('w-[50%]')}>
              <div className={cx('image-box')}>
                <ImageComponent
                  aspect_ratio="82%"
                  src="https://new-ella-demo.myshopify.com/cdn/shop/files/banner-image-4_420x.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductBlockComponent layout="grid" collectionHandle="new-in"></ProductBlockComponent>
    </div>
  );
};

export default HomePage;
